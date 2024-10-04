const express = require("express");
const tasksRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use("/tasks", tasksRoutes);

app.listen(3000, () => console.log("Servidor listo!"));

app.get("/", (req, res) => res.send("¡Hola!"));
