import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: "1s", target: 1 },
    { duration: "1s", target: 3 },
    { duration: "1s", target: 5 },
    { duration: "1s", target: 7 },
  ],
  //thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },

  noConnectionReuse: true,

  userAgent: 'MyK6UserAgentString/1.0',

};

export default function() {
  let response = http.get('https://serverest.dev/usuarios');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response contains users': (r) => JSON.parse(r.body).usuarios.length > 0,
  });

  let usuarios = JSON.parse(response.body).usuarios;
  usuarios.forEach((usuario) => {
    check(usuario, {
      'has name': (u) => u.nome !== null,
      'has email': (u) => u.email !== null,
      'has password': (u) => u.password !== null,
    });
  });

  sleep(1);
}