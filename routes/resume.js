const router = require("express").Router();
const mongoose = require("mongoose");

const checkLogin = require('../middlewares/login');

const Resume = require("../models/resume");

router.get("/education", checkLogin, (req, res, next) => {
  res.render('resume/educational-details');
});

router.get("/work", checkLogin, (req, res, next) => {
  try {
    res.render('resume/work-experience');
  } catch(err){
    console.log(err);
  }
});

router.get("/skill", checkLogin, (req, res, next) => {
  res.render('resume/skills');
});

router.post("/education", checkLogin, async (req, res, next) => {
  try{
    var resume = await Resume.findOne({ userId: req.session.userid }).exec();
    resume.education_experience = req.body;
    await resume.save();
    res.redirect("/resume/work");
  }
  catch(err){
    console.log(err);
  }
});

router.post("/work", checkLogin, async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.session.userid }).exec();
  resume.work_experience = req.body;
  await resume.save();
  res.redirect("/resume/skill");
});

router.post("/skill", checkLogin, async (req, res, next) => {
  var resume = await Resume.findOne({ userId: req.session.userid }).exec();
  resume.skills = req.body.skills;
  await resume.save();
  res.redirect("/job");
});

module.exports = router;