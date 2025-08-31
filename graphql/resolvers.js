const userService = require("../service/userService");
const transferService = require("../service/transferService");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "segredo";

module.exports = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await userService.loginUser(username, password);
      if (!user) throw new Error("Usuário ou senha inválidos");
      const token = jwt.sign({ username: user.username }, SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },
    users: async () => userService.getUsers(),
    transfers: async () => transferService.getAllTransfers(),
  },
  Mutation: {
    registerUser: async (_, { username, password, favorecido }) => {
      try {
        return await userService.registerUser(username, password, favorecido);
      } catch (err) {
        throw new Error(err.message);
      }
    },
    transfer: async (_, { from, to, value }, context) => {
      if (!context.user) throw new Error("Token JWT ausente ou inválido");
      try {
        return await transferService.transferValue(from, to, value);
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
