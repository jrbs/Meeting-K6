//Teste de carga:
//enviar uma grande quantidade de requisições para a API e verificar se ela consegue lidar com a carga sem apresentar erros

import http from "k6/http";
import { check, group, sleep } from "k6";

export let options = {
  stages: [
    { duration: "1s", target: 1 },
    { duration: "1s", target: 1 },
    { duration: "1s", target: 1 },
    { duration: "1s", target: 1 },
  ],
  //thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },

  noConnectionReuse: true,

  userAgent: 'MyK6UserAgentString/1.0',

};
export default function () {
  group("Realiza teste de carga no metodo GET escalonando os acessos",function () {
      //escalondando acessos
      let carga = http.get("https://serverest.dev/api/produtos");
      check(carga, {
        "status is 200": (r) => r.status == 200,
        "response body is not empty": (r) => r.body.length > 0,
        "content type is application/json": (r) =>
          r.headers["Content-Type"] === "application/json; charset=utf-8",
      });
      console.log("Duranção da REQ1 : " + carga.timings.duration);
      sleep(1);
    }
    
  );
}
