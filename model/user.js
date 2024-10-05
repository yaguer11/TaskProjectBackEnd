const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, reqired: true, unique: true },
  password: { type: String, reqired: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
