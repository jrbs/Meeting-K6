//Teste de latência: 
//Medir o tempo que a API leva para responder às requisições. 
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  let start = new Date().getTime();
  let res = http.get('https://serverest.dev/usuarios');
  let end = new Date().getTime();
  check(res, { 'status is 200': (r) => r.status === 200 });
  check(res, { 'has valid JSON response': (r) => JSON.parse(r.body).length > 0 });
  check(res, { 'has correct data': (r) => JSON.parse(r.body)[0].nome === 'Fulano da Silva' });
  check(res, { 'latency is less than 100ms': (r) => end - start < 100 });
  sleep(1);

  console.log(`Tempo de resposta: ${end - start} ms`);

}
