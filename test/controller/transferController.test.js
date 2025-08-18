// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

//Mock
const transferService = require("../../service/transferService");

// Testes
describe("Transfer Controller", () => {
  beforeEach(() => {
    // Garante que o sinon começa limpo antes de cada teste
    sinon.restore();
  });

  afterEach(() => {
    // Garante que mesmo se o teste falhar, o mock é restaurado
    sinon.restore();
  });

  describe("POST/ transfers", () => {
    it("Quando informo remetente e destinatário inexistentes, recebo 400", async () => {
      const resposta = await request(app).post("/transfer").send({
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

    it("Usando Mocks: Quando informo remetente e destinatário inexistentes, recebo 400", async () => {
      // Mockar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transferValue");
      transferServiceMock.throws(
        new Error("Não é possível transferir para si mesmo")
      );

      const resposta = await request(app).post("/transfer").send({
        from: "Natalia",
        to: "Natalia",
        value: 100,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Usuário remetente ou destinatário não encontrado"
      );
    });

    it("Usando Mocks: Quando informo valores válidos, recebo 201 CREATED", async () => {
      // Mockar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transferValue");
      transferServiceMock.returns({
        from: "Natalia",
        to: "Lais",
        value: 100,
        date: new Date().toISOString(),
      });

      const resposta = await request(app).post("/transfer").send({
        from: "Natalia",
        to: "Lais",
        value: 100,
      });

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("from", "Natalia");
      expect(resposta.body).to.have.property("to", "Lais");
      expect(resposta.body).to.have.property("value", 100);
    });
  });
});
