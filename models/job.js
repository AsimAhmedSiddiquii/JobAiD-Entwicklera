const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  company: { type: String, required: true },
  ratings: String,
  reviews: String,
  experience: String,
  salary: String,
  location: String,
  posted: String,
  url: String,
});

module.exports = mongoose.model("jobs", jobSchema);
