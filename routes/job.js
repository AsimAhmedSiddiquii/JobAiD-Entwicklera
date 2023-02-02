const router = require("express").Router();
const checkLogin = require("../middlewares/login");

const Job = require("../models/job");

router.get("/preferences", checkLogin, (req, res, next) => {
  res.render("job/preferences");
});

router.post("/preferences", async (req, res, next) => {
  console.log(req.body);
  const jobs = await Job.find({
    title: { $regex: req.body.role, $options: "i" },
    location: { $regex: req.body.location, $options: "i" },
  }).exec();

  for (index = 0; index < jobs.length; index++) {
    jobs[index].jobID = jobs[index]._id;
  }
  res.render("job/results", { jobs });
});

// router.get("/results", checkLogin, async (req, res, next) => {
//   const resume = await Resume.findOne({ userId: req.session.userid }).exec();
//   if (resume && resume.skills) {
//     const jobs = await Job.find({
//       skills: { $in: resume.skills },
//     }).exec();
//     res.render("job/results");
//   } else {
//     res.redirect("/resume/education");
//   }
// });

module.exports = router;
