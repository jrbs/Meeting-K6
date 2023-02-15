//Teste de carga: 
//enviar uma grande quantidade de requisições para a API e verificar se ela consegue lidar com a carga sem apresentar erros

import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  vus: 50, // número de usuários virtuais simulados
  duration: '30s', // duração do teste
};


export let duration = {
    stages: [
      { duration: "1m", target: 50 },
      { duration: "1m", target: 100 },
      { duration: "1m", target: 200 },
      { duration: "1m", target: 300 }
    ]
  };

export default function () {
 
group('Realiza teste de carga no metodo GET', function(){
  //get
  let res = http.get('https://serverest.dev/usuarios');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);

})

group('Realiza teste de carga no metodo POST', function(){
    //post
  let post = http.post("https://serverest.dev/usuarios", {
    nome: "Fulano de Tal",
    email: "fulano@teste.com",
    password: "123456",
  });
  check(post, {
    "status is 201": (r) => r.status === 201,
    "response body": (r) => JSON.parse(r.body).nome === "Fulano de Tal",
  });
})
}