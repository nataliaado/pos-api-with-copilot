const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "segredo";

module.exports = (req) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    console.warn("Header de autorização ausente ou mal formatado");
    return {};
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const user = jwt.verify(token, SECRET);
    return { user };
  } catch (err) {
    console.warn("Token inválido:", err.message);
    return {};
  }
};
