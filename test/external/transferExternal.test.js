// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

//Mock
const transferService = require("../../service/transferService");

//Testes
describe("Transfer via HTTP", () => {
  describe("POST/ transfer via HTTP", () => {

    beforeEach(async () => {
      const respostaLogin = await request("http://localhost:3000").post("/login").send({
        username: "Natalia",
        password: "123456",
      });

      token = respostaLogin.body.token;
    });

    it("Quando informo remetente e destinatário inexistentes, recebo 400, via HTTP", async () => {
      // Realizar a Transferencia
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

    it("Quando informo valores válidos, recebo 201 CREATED, via HTTP", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .set("authorization", `Bearer ${token}`)
        .send({
          from: "Natalia",
          to: "Lais",
          value: 100,
        });

      expect(resposta.status).to.equal(201);

      // Validação com um Fixture
      const respostaEsperada = require("../fixture/respostas/quandoInformoValoresValidosReceboSucesso201Created.json");
      delete resposta.body.date;
      delete respostaEsperada.date;
      expect(resposta.body).to.deep.equal(respostaEsperada);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
