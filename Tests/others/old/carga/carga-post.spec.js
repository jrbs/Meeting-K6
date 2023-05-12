import http from 'k6/http';
import { check, group, sleep } from "k6";

export let options = {
  vus: 10,
  duration: '3s',
};

const random = () => {
    let rEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
    return rEmail;
}

export default function() {
  group('Create user', function() {
    let url = 'https://serverest.dev/usuarios';
    let payload = JSON.stringify({ 
      nome: 'Usuário de Teste',
      email: random(),
      password: '123456',
      administrador : 'false'
    });
  
    let params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    let response = http.post(url, payload, params);
    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);
    console.log(`Payload Create User: ${payload}`);

    check(response, {
        "status is 201": (r) => r.status == 200,
        "response body is not empty": (r) => r.body.length > 0,
        "content type is application/json": (r) =>
          r.headers["Content-Type"] === "application/json; charset=utf-8",
      });
  });

  sleep(1);
}
