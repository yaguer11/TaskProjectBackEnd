// Conectar a MongoDB y levantar el servidor
const mongoose = require("mongoose");

function connectDatabase() {
  mongoose
    .connect(process.env.MONGOCONEXION)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch((err) => console.error("Error al conectar a la base de datos", err));
}

module.exports = { connectDatabase };
