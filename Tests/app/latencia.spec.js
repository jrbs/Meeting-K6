import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
  iterations: 10, // Número de iterações do teste
  vus: 1, // Número de usuários virtuais
};

const requestDuration = new Trend('request_duration');

export default function () {
  const url = 'https://serverest.dev/produtos';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.get(url, params);
  requestDuration.add(response.timings.duration);
  console.warn("Teste de Latencia duração "+ response.timings.duration)
  sleep(1);
}
