const transferService = require("../service/transferService");

exports.transfer = (req, res) => {
  const { from, to, value } = req.body;
  try {
    const transfer = transferService.transferValue(from, to, value);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getTransfers());
};
