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

export default function () {
  const url = 'https://serverest.dev/usuarios';

  const payload = JSON.stringify({
    nome: 'User Teste',
    email: `test${__VU}@example.com`,
    password: '123456',
    administrador: 'false',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1);
}
