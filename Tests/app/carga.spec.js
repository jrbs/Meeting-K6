import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 10 }, // Aumenta a carga para 10 usuários durante 5 segundos
    { duration: '4s', target: 20 }, // Mantém a carga de 10 usuários durante 10 segundos
    { duration: '2s', target: 5 }, // Reduz a carga para 0 usuários durante 5 segundos
  ],
  thresholds: {
    //http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        "http_req_duration": ["p(95)<500"],
        "http_req_duration{staticAsset:yes}": ["p(95)<100"]
  },
};

const requestDuration = new Trend('request_duration');
const successRate = new Rate('success_rate');
const errorCounter = new Counter('error_counter');

const Emailrandom = () => {
    let rEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
    return rEmail;
}

export default function () {
  const url = 'https://serverest.dev/usuarios';


  const payload = JSON.stringify({
    nome: 'User Teste',
    email: Emailrandom(),
    password: '123456',
    administrador: 'false',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);
  const success = response.status === 201;

  requestDuration.add(response.timings.duration);
  successRate.add(success);
  errorCounter.add(!success);

  console.warn("Teste de Carga duração "+ response.timings.duration)
  console.warn("Asserção " + success)
  
  check(response, {
    "status is 201": (dr) => dr.status == 201,
    "response body is not empty": (r) => r.body.length > 0,
    "content type is application/json": (r) =>
      r.headers["Content-Type"] === "application/json; charset=utf-8",
  });

  sleep(3);
}
