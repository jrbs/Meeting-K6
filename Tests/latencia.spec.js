import http from 'k6/http';
import { check, sleep } from 'k6';

export default function() {
  const url = 'https://serverest.dev/produtos';

  let response = http.get(url);
  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  const start = new Date().getTime();
  response = http.get(url);
  const end = new Date().getTime();
  const latency = end - start;

  console.log(`Latência: ${latency} ms`);

  sleep(1);
}