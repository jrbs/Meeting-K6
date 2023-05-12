//Teste de carga: 
//enviar uma grande quantidade de requisições para a API e verificar se ela consegue lidar com a carga sem apresentar erros

import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  vus: 50, // número de usuários virtuais simulados
  duration: '5s', // duração do teste
};

export default function () {
 
  group('Realiza teste de carga no metodo GET em /usuarios', function(){
    //get
    let res = http.get('https://serverest.dev/usuarios');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

  })

  group('Realiza teste de carga no metodo GET em /produtos', function(){
    //get
    let res = http.get('https://serverest.dev/produtos');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

  })

}//