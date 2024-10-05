const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controller/task");
const Task = require("../model/task");

const router = express.Router();

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener las tareas", error: err.message });
  }
});

router.get("/:id", getTaskById);

// Crear una nueva tarea
router.post("/", createTask);

// Actualizar una tarea existente
router.put("/:id", updateTask);

// Eliminar una tarea
router.delete("/:id", deleteTask);

module.exports = router;
