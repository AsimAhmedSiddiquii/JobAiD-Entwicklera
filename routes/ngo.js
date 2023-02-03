const mongoose = require("mongoose");
const router = require("express").Router();

const checkLogin = require("../middlewares/login");

const Ngo = require("../models/ngo");

router.get("/", checkLogin, async (req, res, next) => {
  const ngos = await Ngo.find().exec();
  res.render("ngo/ngo", { ngos: ngos });
});

module.exports = router;
