const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: String,
});

module.exports = mongoose.model("trainings", trainingSchema);
