const router = require("express").Router();
const mongoose = require("mongoose");

const Resume = require("../models/resume");

router.get("/education", (req, res, next) => {
  console.log('Education')
  res.render('resume/educational-details');
});

router.get("/work", (req, res, next) => {
  res.render('resume/work-experience');
});

router.get("/skill", (req, res, next) => {
  res.render('resume/skills');
});

router.post("/education", async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.session.userid }).exec();
  resume.education_experience = req.body;
  await resume.save();
  res.redirect("/resume/work-experience");
});

router.post("/work", async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.session.userid }).exec();
  resume.work_experience = req.body;
  await resume.save();
  res.redirect("/resume/skills");
});

router.post("/skills", async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.session.userid }).exec();
  resume.skills = req.body.skills;
  await resume.save();
  res.redirect("/resume/job");
});
module.exports = router;
