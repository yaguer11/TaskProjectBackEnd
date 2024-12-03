const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de usuario
module.exports.register = (req, res) => {
  const { username, password, email, name } = req.body;

  // Hashear la contraseña
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // Crear un nuevo usuario con la contraseña hasheada
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        name,
      });

      // Guardar el nuevo usuario en la base de datos
      return newUser.save();
    })
    .then(() => {
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al registrar el usuario", error: err.message });
    });
};

// Autenticación de usuario (Login)
module.exports.login = (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario por el nombre de usuario
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Comparar la contraseña ingresada con la almacenada en la base de datos
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });

        // Enviar el token en la respuesta
        res.status(200).json({
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
          },
        });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al iniciar sesión", error: err.message });
    });
};

module.exports.loginInfo = (req, res) => {
  res
    .status(400)
    .send(
      "Debes realizar un POST a esta ruta con tu usuario y contraseña para iniciar sesión."
    );
};
