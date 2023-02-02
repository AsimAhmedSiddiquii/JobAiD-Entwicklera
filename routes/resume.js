const router = require("express").Router();

const checkLogin = require('../middlewares/login');

const Resume = require("../models/resume");

router.get("/education", checkLogin, (req, res, next) => {
  try {
    res.render('resume/educational-details');
  } catch (err) {
    console.log(err);
  }
});

router.get("/work", checkLogin, (req, res, next) => {
  try {
    res.render('resume/work-experience');
  } catch (err) {
    console.log(err);
  }
});

router.get("/skill", checkLogin, (req, res, next) => {
  try {
    res.render('resume/skills');
  } catch (err) {
    console.log(err);
  }
});

router.post("/education", checkLogin, async (req, res, next) => {
  try {
    var resume = await Resume.findOne({ userId: req.session.userid }).exec();
    resume.education_experience = req.body;
    await resume.save();
    res.redirect("/resume/work");
  }
  catch (err) {
    console.log(err);
  }
});

router.post("/work", checkLogin, async (req, res, next) => {
  try {
    var resume = await Resume.findOne({ userId: req.session.userid }).exec();
    resume.work_experience = req.body;
    await resume.save();
    res.redirect("/resume/skill");
  } catch (err) {
    console.log(err);
  }
});

router.post("/skill", checkLogin, async (req, res, next) => {
  try {
    var resume = await Resume.findOne({ userId: req.session.userid }).exec();
    if(req.body.hiddenSkills) {
      resume.skills = req.body.hiddenSkills;
      resume.skills = resume.skills[0].split(',');
    } else {
      resume.skills = req.body.skills;
    }
    await resume.save();
    res.redirect("/job/results");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;