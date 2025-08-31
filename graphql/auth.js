const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "segredo";

module.exports = (req) => {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = jwt.verify(token, SECRET);
      return { user };
    } catch (err) {
      return {};
    }
  }
  return {};
};
