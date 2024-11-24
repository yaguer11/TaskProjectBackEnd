const Task = require("../model/task");

// Controlador para mostrar todas las tareas
module.exports.getTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al obtener las tareas", error: err.message });
    });
};

// Controlador para buscar una tarea por ID (método GET)
module.exports.getTaskById = (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.status(200).json(task);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al buscar la tarea", error: err.message });
    });
};

// Crear una nueva tarea
module.exports.createTask = (req, res) => {
  const { name, description, story, created, dueDate, done } = req.body;

  const task = new Task({
    name,
    description,
    story,
    created,
    dueDate,
    done,
  });

  task
    .save()
    .then((task) => {
      res.status(201).json({
        message: "Tarea creada exitosamente",
        task: task,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error al crear la tarea",
        error: err.message,
      });
    });
};

// Actualizar una tarea existente
module.exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { name, description, story, created, dueDate, done } = req.body;

  Task.findByIdAndUpdate(
    id,
    { name, description, story, created, dueDate, done },
    { new: true }
  )
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.status(200).json({
        message: "Tarea actualizada exitosamente",
        task: updatedTask,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error al actualizar la tarea",
        error: err.message,
      });
    });
};

// Eliminar una tarea
module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.status(200).json({
        message: "Tarea eliminada exitosamente",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error al eliminar la tarea",
        error: err.message,
      });
    });
};
