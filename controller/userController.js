const userService = require("../service/userService");

exports.register = (req, res) => {
  const { username, password, favorecido } = req.body;
  try {
    const user = userService.registerUser(username, password, favorecido);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  try {
    const user = userService.loginUser(username, password);
    // Gerar token JWT
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};
