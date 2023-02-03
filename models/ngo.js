const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
  ratings: String,
  address: String,
});

module.exports = mongoose.model("ngos", ngoSchema);
