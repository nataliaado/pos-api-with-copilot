// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");

//Testes
describe("transfers", () => {
  describe("POST/ transfers", () => {
    it("Quando informo remetente e destinatário inexistentes, recebo 400, via HTTP", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .send({
          from: "Natalia",
          to: "Lais",
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
