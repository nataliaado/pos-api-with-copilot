const jwt = require("jsonwebtoken");

class AuthenticateToken {
  constructor(secret) {
    this.secret = secret || process.env.JWT_SECRET || "segredo";
  }

  handler(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    jwt.verify(token, this.secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido" });
      }
      req.user = user;
      next();
    });
  }
}

module.exports = AuthenticateToken;
