const mongoose = require("mongoose");

const User = require("./user");
const workSchema = new mongoose.Schema({
  company_name: String,
  start_date: { type: String },
  end_date: { type: String },
  description: { type: String },
});

const educationSchema = new mongoose.Schema({
  institute_name: String,
  completed: Boolean,
  degree_title: String,
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: User },
  work_experience: [workSchema],
  education_experience: [educationSchema],
  skills: [String],
});

module.exports = mongoose.model("resumes", resumeSchema);
