const router = require("express").Router();
const checkLogin = require('../middlewares/login');

const Resume = require("../models/resume");
const Job = require("../models/job");

router.get("/", checkLogin, async (req, res, next) => {
  const resume = await Resume.findOne({ userId: req.session.userid }).exec();
  console.log(resume)
  if(resume && resume.skills) {
    const jobs = await Job.find({
      skills: { $in: resume.skills },
    }).exec();
    res.render('jobs');
  } else {
    res.redirect('/resume/education')
  }
});

module.exports = router;
