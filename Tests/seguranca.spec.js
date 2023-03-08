import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let payload = JSON.stringify({
    email: 'usuarioinvalido',
    password: 'senhainvalida',
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post('https://serverest.dev/login', payload, params);
  check(res, {
    'status is 401': (r) => r.status === 401,
    'contains error message': (r) => r.json('message') === 'Email e/ou senha inválidos',
  });
}