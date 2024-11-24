const mongoose = require("mongoose");

// Defino la esrucutura de los datos para las tareas
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  done: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
