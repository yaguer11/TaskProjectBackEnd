const tasksRoutes = require("./taskRoutes");
const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const epicRoutes = require("./epicRoutes");
const storyRoutes = require("./storyRoutes");
const { verifyToken } = require("../middleware/authMiddleware");

function configureRoutes(app) {
  // Rutas públicas
  app.use("/auth", authRoutes);

  // Rutas protegidas
  app.use("/tasks", verifyToken, tasksRoutes);
  app.use("/projects", verifyToken, projectRoutes);
  app.use("/epics", verifyToken, epicRoutes);
  app.use("/stories", verifyToken, storyRoutes);

  // Ruta principal
  app.get("/", (req, res) =>
    res.send("Bienvenido a la API de gestión de tareas")
  );
}

module.exports = { configureRoutes };
