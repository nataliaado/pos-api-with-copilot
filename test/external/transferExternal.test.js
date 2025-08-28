// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");

//Testes
describe("transfers", () => {
  describe("POST/ transfers", () => {
    it("Quando informo remetente e destinatário inexistentes, recebo 400, via HTTP", async () => {
      // 1) Capturar o Token
      const respostaLogin = await request("http://localhost:3000")
        .post("/login")
        .send({
          username: "Natalia",
          password: "123456"
        });

      const token = respostaLogin.body.token;

      //console.log(token);
      //console.log(respostaLogin.body);

      // 2) Realizar a Transferencia
      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .set("authorization", `Bearer ${token}`)
        .send({
          from: "Natalia",
          to: "Nicole",
          value: 100,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Usuário remetente ou destinatário não encontrado"
      );
    });
  });
});
