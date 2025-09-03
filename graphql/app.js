// app.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "segredo";

const app = express();
app.use(express.json());

function auth(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  if (token) {
    try {
      const user = jwt.verify(token, SECRET);
      return { user };
    } catch (err) {
      console.warn("Token inválido:", err.message);
    }
  }

  return {};
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => auth(req),
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

module.exports = app;
