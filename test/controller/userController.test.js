// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

//Mock
const userService = require("../../service/userService");

// Testes
describe("User Controller", () => {
  describe("POST/ register", () => {
    it("Quando quero registrar um usuário, recebo 201", async () => {
      const resposta = await request(app).post("/register").send({
        username: "Joaquim",
        password: "123456",
        favorecido: true,
      });

      expect(resposta.status).to.equal(201);
    });

    it("Quando quero registrar um usuário já cadastrado, recebo 400", async () => {
      const resposta = await request(app).post("/register").send({
        username: "Natalia",
        password: "123456",
        favorecido: true,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário já existe");
    });

    it("Usando Mocks: Quando quero registrar um usuário já cadastrado, recebo 400", async () => {
      // Mockar apenas a função do Service
      const userServiceMock = sinon.stub(userService, "registerUser");
      userServiceMock.throws(new Error("Usuário já existe"));

      const resposta = await request(app).post("/register").send({
        username: "Natalia",
        password: "123456",
        favorecido: true,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário já existe");
    });
  });
});
