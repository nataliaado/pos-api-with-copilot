const request = require("supertest");
const { expect, use } = require("chai");

const chaiExclude = require("chai-exclude");
use(chaiExclude);

describe("GRAPHQL - Transfer via HTTP", () => {
  before(async () => {
    const loginUser = require("../fixture/requisicoes/login/loginUser.json");
    const resposta = await request("http://localhost:4000/graphql")
      .post("")
      .send(loginUser);

    token = resposta.body.data.login.token;
  });

  beforeEach(() => {
    createTransfer = require("../fixture/requisicoes/transferencia/createTransfer.json");
  });

  it("Quando informo valores válidos, recebo 200 CREATED, via HTTP", async () => {
    const respostaEsperada = require("../fixture/respostas/transferencia/validarTransferenciaFeitaComSucesso.json");

    const respostaTransfer = await request("http://localhost:4000/graphql")
      .post("")
      .set("Authorization", `Bearer ${token}`)
      .send(createTransfer);

    expect(respostaTransfer.status).to.equal(200);
    expect(respostaTransfer.body.data.transfer).excluding("date").to.deep.equal(respostaEsperada);
  });

  it("Quando informo remetente e destinatário inexistentes, recebo mensagem de erro de transferencia, via HTTP", async () => {
    createTransfer.variables.from = "Nicole";
    createTransfer.variables.to = "Natalia";

    const respostaTransfer = await request("http://localhost:4000/graphql")
      .post("")
      .set("Authorization", `Bearer ${token}`)
      .send(createTransfer);

    expect(respostaTransfer.body)
      .to.have.nested.property("errors[0].message")
      .that.includes("Usuário não autorizado para transferir dessa conta");
  });

  it("Quando realizo uma tranferencia sem o token, recebo uma mensagem de erro de autenticação, via HTTP", async () => {
    createTransfer.variables.from = "Nicole";
    createTransfer.variables.to = "Natalia";

    const respostaTransfer = await request("http://localhost:4000/graphql")
      .post("")
      .send(createTransfer);

    expect(respostaTransfer.body)
      .to.have.nested.property("errors[0].message")
      .that.includes("Usuário não autenticado");
  });
});
