const { title } = require("process");
const Task = require("../model/task");
const { red } = require("@mui/material/colors");

module.exports.createTask = (req, res) => {
  const task = new Task({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    status: req.body.status,
    geo_long: req.body.geo_long,
    geo_lat: req.body.geo_lat,
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
