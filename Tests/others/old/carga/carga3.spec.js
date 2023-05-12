import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from "k6/metrics";

export let options = {
  stages: [
    { duration: '5s', target: 2 }, 
    { duration: '7s', target: 5 }, 
    { duration: '5s', target: 10 }, 
  ],
  thresholds: {
    //http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        "http_req_duration": ["p(95)<500"],
        "http_req_duration{staticAsset:yes}": ["p(95)<100"]
  },
};

const random = () => {
    let rEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
    return rEmail;
}

export default function () {
  const url = 'https://serverest.dev/usuarios';

  const payload = JSON.stringify({
    nome: 'User Teste',
    email: random(),
    password: '123456',
    administrador: 'false',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Monitor' : 'false'
    },
  };

  const response = http.post(url, payload, params);
  check(response, {
    'status is 201': (response) => response.status == 201, 
    'verify body message text': (r) => r.body.includes('Cadastro realizado com sucesso'),
  });

  sleep(3);
}
