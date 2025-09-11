const jwt = require("jsonwebtoken");
const { users } = require("../model/userModel");

const SECRET = process.env.JWT_SECRET || "segredo";
const transferencias = [];

const resolvers = {
  Query: {
    login: (_, { username, password }) => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        throw new Error("Login ou senha inválidos");
      }

      const token = jwt.sign({ username: user.username }, SECRET, {
        expiresIn: "1h",
      });

      return { token, user };
    },

    users: () => users,

    transfers: () => transferencias,
  },

  Mutation: {
    registerUser: (_, { username, password, favorecido }) => {
      const existente = users.find((u) => u.username === username);
      if (existente) {
        throw new Error("Usuário já existe");
      }

      const novoUsuario = { username, password, favorecido };
      users.push(novoUsuario);
      return novoUsuario;
    },

    transfer: (_, { from, to, value }, context) => {
      const user = context.user;

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      if (user.username !== from) {
        throw new Error("Usuário não autorizado para transferir dessa conta");
      }

      if (value > 5000) {
        throw new Error("Transferências acima de 5000 não são permitidas");
      }

      const novaTransferencia = {
        from,
        to,
        value,
        date: new Date().toISOString(),
      };

      transferencias.push(novaTransferencia);
      return novaTransferencia;
    },
  },
};

module.exports = resolvers;
