const express = require("express");
const AuthenticateToken = require("./middleware/authenticateToken");
const userController = require("./controller/userController");
const transferController = require("./controller/transferController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

// Instancia o middleware de autenticação JWT
const authenticateToken = new AuthenticateToken().handler.bind(
  new AuthenticateToken()
);

// User routes
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/users", userController.getUsers);

// Transfer routes
app.post("/transfer", authenticateToken, transferController.transfer);
app.get("/transfers", authenticateToken, transferController.getTransfers);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
