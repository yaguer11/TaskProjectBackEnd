const mongoose = require("mongoose");

const epicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
  points: { type: Number, default: 0, min: 0, max: 5 },
  created: { type: Date, default: Date.now },
  due: { type: Date, required: false },
  started: { type: Date, required: false },
  finished: { type: Date, required: false },
  status: {
    type: String,
    enum: ["todo", "running", "done"],
    default: "todo",
  },
  icon: { type: String, required: false },
});

module.exports = mongoose.model("Epic", epicSchema);
