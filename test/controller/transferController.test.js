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
        new Error('Não é possível transferir para si mesmo'));

      const resposta = await request(app).post('/transfer').send({
        from: "Natalia",
        to: "Natalia",
        value: 100,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        'error',
        'Usuário remetente ou destinatário não encontrado'
      );

      // Reseto o Mock
      sinon.restore();
    });
  });
});
