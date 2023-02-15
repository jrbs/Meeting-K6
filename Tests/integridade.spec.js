//Teste de integridade: 
//Verificar se os dados retornados pela API estão corretos e de acordo com as especificações

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  let res = http.get('https://serverest.dev/usuarios');
  check(res, { 'status is 200': (r) => r.status === 200 });
  check(res, { 'has valid JSON response not empty': (r) => JSON.parse(r.body).length > 0 });
  check(res, { 'has correct data': (r) => JSON.parse(r.body)[0].nome === 'Fulano da Silva' });
  sleep(1);
}
//

