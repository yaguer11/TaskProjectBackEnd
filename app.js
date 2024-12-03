const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const { connectDatabase } = require("./config/database");
const { configureRoutes } = require("./routes/appRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

// Configura CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Dominio del FrontEnd
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Para cookies y encabezados como Authorization
  })
);

connectDatabase();
configureRoutes(app);

const puerto = process.env.PUERTO || 3002;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

// Middleware para manejo de errores
app.use(errorHandler);
