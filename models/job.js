const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  company: { type: String, required: true },
  skills: [String],
  description: String,
  email: String,
});

module.exports = mongoose.model("jobs", jobSchema);
