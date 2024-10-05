const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema({
  id: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  start: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "done"],
    required: true,
  },
  geo_long: {
    type: String,
    required: false,
  },
  geo_lat: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("tasks_collections", taskSchema);
