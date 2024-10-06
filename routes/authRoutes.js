const express = require("express");
const { register, login } = require("../controller/auth");

const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta GET para mostrar un mensaje en el navegador
router.get("/login", (req, res) => {
  res
    .status(400)
    .send(
      "Debes realizar un POST a esta ruta con tu usuario y contraseña para iniciar sesión."
    );
});

module.exports = router;
