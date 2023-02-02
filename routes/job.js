const router = require("express").Router();

const Resume = require("../models/resume");
const Job = require("../models/job");

router.get("/", (req, res, next) => {
  res.render('jobs')
});

router.get("/:userid", async (req, res, next) => {
  const resume = await Resume.findOne({ userId: req.params.userid }).exec();
  const jobs = await Job.find({
    skills: { $in: resume.skills },
  }).exec();
  res.json(jobs);
});

module.exports = router;
