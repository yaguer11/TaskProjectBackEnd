const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");
const { verifyToken } = require("../middleware/authMiddleware"); // Middleware para proteger las rutas

// Rutas protegidas para proyectos
router.get("/", verifyToken, projectController.getAllProjects);
router.get("/:id", verifyToken, projectController.getProjectById);
router.post("/", verifyToken, projectController.createProject);
router.put("/:id", verifyToken, projectController.updateProject);
router.delete("/:id", verifyToken, projectController.deleteProject);

module.exports = router;
