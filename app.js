const express = require("express");
const tasksRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/tasks", tasksRoutes);

const puerto = process.env.PUERTO || 3002;

app.listen(puerto, (err, res) => {
  mongoose.connect(process.env.MONGOCONEXION);
});

app.get("/", (req, res) => res.send("¡Hola!"));
