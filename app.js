const express = require("express");

const { connectDatabase } = require("./config/database");
const { configureRoutes } = require("./routes/appRoutes");
const dotenv = require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

connectDatabase();
configureRoutes(app);

const puerto = process.env.PUERTO || 3002;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

// Middleware para manejo de errores
app.use(errorHandler);
