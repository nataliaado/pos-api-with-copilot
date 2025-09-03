const request = require("supertest");
const { expect } = require("chai");

describe("GRAPHQL - Transfer via HTTP", () => {
  beforeEach(async () => {
    const query = `
      query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `;

    const variables = {
      username: "Natalia",
      password: "123456",
    };

    const respostaLogin = await request("http://localhost:4000")
      .post("/graphql")
      .send({ query, variables });

    token = respostaLogin.body.data.login.token;
  });

  it("Quando informo valores válidos, recebo 200 CREATED, via HTTP", async () => {
    const mutation = `
      mutation Transfer($from: String!, $to: String!, $value: Float!) {
        transfer(from: $from, to: $to, value: $value) {
          from
          to
          value
        }
      }
    `;

    const variables = {
      from: "Natalia",
      to: "Lais",
      value: 100,
    };

    const respostaTransfer = await request("http://localhost:4000")
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query: mutation, variables });
    expect(respostaTransfer.status).to.equal(200);
  });

  it("Quando informo remetente e destinatário inexistentes, recebo mensagem de erro de transferencia, via HTTP", async () => {
    const mutation = `
      mutation Transfer($from: String!, $to: String!, $value: Float!) {
        transfer(from: $from, to: $to, value: $value) {
          from
          to
          value
        }
      }
    `;

    const variables = {
      from: "Nicole",
      to: "Natalia",
      value: 100,
    };

    const respostaTransfer = await request("http://localhost:4000")
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query: mutation, variables });
    expect(respostaTransfer.body)
      .to.have.nested.property("errors[0].message")
      .that.includes("Usuário não autorizado para transferir dessa conta");
  });

  it("Quando realizo uma tranferencia sem o token, recebo uma mensagem de erro de autenticação, via HTTP", async () => {
    const mutation = `
      mutation Transfer($from: String!, $to: String!, $value: Float!) {
        transfer(from: $from, to: $to, value: $value) {
          from
          to
          value
        }
      }
    `;

    const variables = {
      from: "Nicole",
      to: "Natalia",
      value: 100,
    };

    const respostaTransfer = await request("http://localhost:4000")
      .post("/graphql")
      .send({ query: mutation, variables });
    expect(respostaTransfer.body)
      .to.have.nested.property("errors[0].message")
      .that.includes("Usuário não autenticado");
  });
});
