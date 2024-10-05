const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  start: Date,
  end: Date,
  status: { type: String, enum: ["pending", "in progress", "done"] },
  geoLong: Number,
  geoLat: Number,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
