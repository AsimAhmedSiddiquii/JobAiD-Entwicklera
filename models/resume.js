const mongoose = require("mongoose");

const User = require("./user");

const resumeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: User },
});

module.exports = mongoose.model("resumes", resumeSchema);
