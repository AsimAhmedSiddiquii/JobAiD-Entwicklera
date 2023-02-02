const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [String],
  url: String,
});

module.exports = mongoose.model("trainings", trainingSchema);
