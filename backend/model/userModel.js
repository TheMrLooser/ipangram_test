const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  sallery: Number,
  designation: String,
  department: mongoose.Types.ObjectId,
  location: String,
});

module.exports = mongoose.model("user", userModel);
