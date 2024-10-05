const express = require("express");
const fs = require("fs");
const { createTask } = require("../controller/task");

const router = express.Router();
const tasks = require("../MockData.json");

function saveTasksToFile(tasks) {
  fs.writeFileSync("./MockData.json", JSON.stringify(tasks, null, 2), "utf-8");
}

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

router.post("/", createTask);

router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasksToFile(tasks);
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToFile(tasks);
    res.status(200).json({ message: "Tarea eliminada" });
  } else {
    res.status(404).json({ message: "Tarea no eliminada" });
  }
});

module.exports = router;
