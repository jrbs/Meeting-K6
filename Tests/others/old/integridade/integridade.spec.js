//Teste de integridade: 
//Verificar se os dados retornados pela API estão corretos e de acordo com as especificações

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '1s',
};

export default function () {
  let res = http.get("https://serverest.dev/usuarios?administrador=false");
  //check(res, { 'status is 200': (r) => r.status === 200 });
  //check(res, { 'has valid JSON response not empty': (r) => JSON.parse(r.body).length > 0 });
  console.log(res.body.quantidade)
  check(res, { 'has correct data': (r) => JSON.parse(r.body).usuarios[0].nome === 'User Teste' });
  sleep(1);
}
//

