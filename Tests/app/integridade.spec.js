import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

export let options = {
  vus: 5, // Número de usuários virtuais
  duration: '10s', // Duração do teste
};

const requestDuration = new Trend('request_duration');
const successRate = new Rate('success_rate');
const errorCounter = new Counter('error_counter');

export default function () {
  const url = 'https://serverest.dev/usuarios';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.get(url, params);
  const success = check(response, {
    'status is 200': (response) => response.status === 200,
    'verify body text ': (r) => r.body.includes('usuarios'),
    'verify body integrity': (r) => JSON.parse(r.body).usuarios.length > 0,
  });

  requestDuration.add(response.timings.duration);
  successRate.add(success);
  errorCounter.add(!success);
  
  console.warn("Teste de Integridade duração "+ response.timings.duration)
  sleep(3);
}
