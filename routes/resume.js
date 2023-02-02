const router = require("express").Router();
const mongoose = require("mongoose");

const Resume = require("../models/resume");

router.get("/", (req, res, next) => {
  console.log("Resume page");
});

router.post("/education/:userid", async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.params.userid }).exec();
  resume.education_experience = req.body;
  await resume.save();
  res.json({ msg: "success" });
});

router.post("/work/:userid", async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.params.userid }).exec();
  resume.work_experience = req.body;
  await resume.save();
  res.json({ msg: "success" });
});

router.post("/skills/:userid", async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.params.userid }).exec();
  resume.skills = req.body.skills;
  await resume.save();
  res.json({ msg: "success" });
});
module.exports = router;
