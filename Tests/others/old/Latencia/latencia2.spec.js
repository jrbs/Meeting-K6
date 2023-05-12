import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  vus: 5, // número de usuários virtuais simulados
  duration: '10s', // duração do teste
};

export default function() {
  group('produtos', function() {
    const url = 'https://serverest.dev/produtos';
    const response = http.get(url);

    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time is less than 2s': (r) => r.timings.duration < 2000,
    });

    sleep(1);
  });
}
