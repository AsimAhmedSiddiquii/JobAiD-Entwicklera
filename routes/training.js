const router = require("express").Router();
const mongoose = require("mongoose");

const Training = require("../models/training");

router.get("/", async (req, res, next) => {
  const training = await Training.find({
    skills: { $in: req.body.skills },
  }).exec();

  res.json(training);
});

module.exports = router;
