const transferService = require("../service/transferService");

exports.transfer = (req, res) => {
  const { from, to, value } = req.body;
  // Usuário autenticado disponível em req.user
  // Exemplo: pode validar se o usuário autenticado é o remetente
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  // Opcional: garantir que o usuário autenticado é o remetente
  if (req.user.username && req.user.username !== from) {
    return res
      .status(403)
      .json({ error: "Token não corresponde ao usuário remetente" });
  }
  try {
    const transfer = transferService.transferValue(from, to, value);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  // Usuário autenticado disponível em req.user
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  res.json(transferService.getTransfers());
};
