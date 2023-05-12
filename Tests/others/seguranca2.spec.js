import http from 'k6/http';
import { check, sleep } from 'k6';

const URL = 'https://serverest.dev/usuarios';

export default function() {
  // login com credenciais válidas
  let payload = JSON.stringify({
    email: 'usuario1@teste.com',
    password: 'senha123'
  });
  let headers = { 'Content-Type': 'application/json' };
  let response = http.post(`${URL}/login`, payload, { headers: headers });
  let authToken = JSON.parse(response.body).authorization;
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response has authorization token': (r) => authToken !== null,
  });

  // criar novo usuário com senha fraca
  payload = JSON.stringify({
    nome: 'Novo Usuario',
    email: 'novousuario@teste.com',
    password: '123'
  });
  headers = {
    'Content-Type': 'application/json',
    'Authorization': authToken,
  };
  response = http.post(URL, payload, { headers: headers });
  check(response, {
    'status is not 201': (r) => r.status !== 201,
    'response does not contain user': (r) => r.body.indexOf('usuario') === -1,
  });

  sleep(1);
}
