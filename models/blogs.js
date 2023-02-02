const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: String,
});

module.exports = mongoose.model("blogs", blogsSchema);
