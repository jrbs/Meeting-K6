import http from "k6/http";
import { check } from "k6";

export default function () {
  // Endpoint: GET /usuarios
  let res = http.get("https://serverest.dev/usuarios");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response body not empty": (r) => r.body.length > 0,
  });

  // Endpoint: POST /usuarios
  res = http.post("https://serverest.dev/usuarios", {
    nome: "Fulano de Tal",
    email: "fulano@teste.com",
    password: "123456",
  });
  check(res, {
    "status is 201": (r) => r.status === 201,
    "response body": (r) => JSON.parse(r.body).nome === "Fulano de Tal",
  });

  // Endpoint: GET /produtos
  res = http.get("https://serverest.dev/produtos");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response body": (r) => r.body.length > 0,
  });

  // Endpoint: POST /produtos
  res = http.post("https://serverest.dev/produtos", {
    nome: "Produto Teste",
    preco: 99.99,
    descricao: "Descrição do produto teste",
  });
  check(res, {
    "status is 201": (r) => r.status === 201,
    "response body": (r) => JSON.parse(r.body).nome === "Produto Teste",
  });

  // Endpoint: GET /pedidos
  res = http.get("https://serverest.dev/pedidos");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response body": (r) => r.body.length > 0,
  });

  // Endpoint: POST /pedidos
  res = http.post("https://serverest.dev/pedidos", {
    idUsuario: "615c29d97aae2d36f5df09f9",
    produtos: [
      {
        idProduto: "615c2b2f7aae2d36f5df09fa",
        quantidade: 1,
      },
    ],
  });
  check(res, {
    "status is 201": (r) => r.status === 201,
    "response body": (r) =>
      JSON.parse(r.body).produtos[0].idProduto === "615c2b2f7aae2d36f5df09fa",
  });
}
