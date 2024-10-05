const express = require("express");
const tasksRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes"); // Agrega las rutas de autenticación
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { verifyToken } = require("./middleware/authMiddleware"); // Importa el middleware de autenticación

const app = express();
app.use(express.json());

// Rutas de autenticación (registro y login)
app.use("/auth", authRoutes);

// Rutas de tareas protegidas (requieren autenticación)
app.use("/tasks", verifyToken, tasksRoutes); // Añadimos el middleware 'verifyToken' para proteger las rutas de tareas

const puerto = process.env.PUERTO || 3002;

// Conectar a MongoDB y levantar el servidor
mongoose
  .connect(process.env.MONGOCONEXION) // Eliminadas las opciones deprecated
  .then(() => {
    app.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
  });

// Ruta pública
app.get("/", (req, res) => res.send("¡Hola!"));

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Algo salió mal", error: err.message });
});
