const express = require("express");
const { register, login } = require("../controller/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", (req, res) => {
  res
    .status(400)
    .send(
      "Debes realizar un POST a esta ruta con tu usuario y contraseña para iniciar sesión."
    );
});

module.exports = router;
