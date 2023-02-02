const router = require("express").Router();
const checkLogin = require('../middlewares/login');

const Resume = require("../models/resume");
const Job = require("../models/job");

const checkLogin = require("../middlewares/login");

router.get("/preferences", checkLogin, (req, res, next) => {
  res.render("job/preferences");
});

router.get("/results", checkLogin, async (req, res, next) => {
  const resume = await Resume.findOne({ userId: req.session.userid }).exec();
  if (resume && resume.skills) {
    const jobs = await Job.find({
      skills: { $in: resume.skills },
    }).exec();
    res.render('job/results');
  } else {
    res.redirect('/resume/education')
  }
});

module.exports = router;
