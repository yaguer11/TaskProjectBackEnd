module.exports = (err, req, res, next) => {
  res.status(500).json({ message: "Algo salió mal", error: err.message });
};
