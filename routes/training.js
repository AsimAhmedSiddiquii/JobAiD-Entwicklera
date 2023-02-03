const router = require("express").Router();
const mongoose = require("mongoose");

const checkLogin = require("../middlewares/login");

const Training = require("../models/training");

router.get("/", checkLogin, async (req, res, next) => {
  var trainingData  = await Training.find()
  res.render("training/training", {trainingData});
});

router.post("/", async (req, res, next) => {
  var trainingData = new Training({
    title: req.body.title,
    url: req.body.url,
  });
  await trainingData.save();
  res.json('success');
});

module.exports = router;
