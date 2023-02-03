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

module.exports = router;