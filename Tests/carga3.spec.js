import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 50 }, // simulates ramp-up of traffic from 0 to 50 users over 10 seconds
    { duration: '7s', target: 50 }, // stay at 50 users for 30 seconds
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
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
