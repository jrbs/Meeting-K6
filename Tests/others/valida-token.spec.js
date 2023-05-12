import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "30s"
};

export function setup() {
  let res = http.post("https://serverest.dev/api/login", {
    email: "user@serverest.dev",
    password: "user123"
  });
  let token = res.json().authorization;
  return { authHeaders: { Authorization: `Bearer ${token}` } };
}

export default function(data) {
  let res = http.get("https://serverest.dev/api/produtos", { headers: data.authHeaders });
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response body is not empty": (r) => r.body.length > 0,
    "content type is application/json": (r) => r.headers['Content-Type'] === 'application/json'
  });
  sleep(1);
}