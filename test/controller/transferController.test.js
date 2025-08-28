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
         // 1) Capturar o Token
           const respostaLogin = await request("http://localhost:3000")
             .post("/login")
             .send({
               username: "Natalia",
               password: "123456"
             });
     
           const token = respostaLogin.body.token;
     
      const resposta = await request(app)
      .post("/transfer")
      .set("authorization", `Bearer ${token}`)
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

    it("Usando Mocks: Quando informo remetente e destinatário inexistentes, recebo 400", async () => {
         // 1) Capturar o Token
      const respostaLogin = await request("http://localhost:3000")
        .post("/login")
        .send({
          username: "Natalia",
          password: "123456"
        });

      const token = respostaLogin.body.token;
     
      // Mockar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transferValue");
      transferServiceMock.throws(
        new Error("Usuário remetente ou destinatário não encontrado")
      );

      const resposta = await request(app)
      .post("/transfer")
      .set("authorization", `Bearer ${token}`)
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

    it("Usando Mocks: Quando informo valores válidos, recebo 201 CREATED", async () => {
          // 1) Capturar o Token
      const respostaLogin = await request("http://localhost:3000")
        .post("/login")
        .send({
          username: "Natalia",
          password: "123456"
        });

      const token = respostaLogin.body.token;
      
      // Mockar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transferValue");
      transferServiceMock.returns({
        from: "Natalia",
        to: "Lais",
        value: 100,
        date: new Date().toISOString(),
      });

      const resposta = await request(app)
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

      // Validação utilizando um expect para cada propriedade da API
      /*expect(resposta.body).to.have.property("from", "Natalia");
      expect(resposta.body).to.have.property("to", "Lais");
      expect(resposta.body).to.have.property("value", 100);*/

      // Comando para printar no console a resposta da api, para que possamos criar o json na pasta fixture
      //console.log(resposta.body);
    });
  });
});
