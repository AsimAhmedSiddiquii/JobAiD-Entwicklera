const mongoose = require("mongoose");

<<<<<<< HEAD
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  url: { type: String, required: true }
});

module.exports = mongoose.model("blogs", blogSchema);
=======
const blogsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: String,
});

module.exports = mongoose.model("blogs", blogsSchema);
>>>>>>> b26ededf5c693c70ed354f5a69af10784f28f2ab
