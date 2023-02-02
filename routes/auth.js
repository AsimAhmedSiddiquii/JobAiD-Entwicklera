const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");

router.get("/register", (req, res, next) => {
  res.json({ msg: "register page" });
});

router.post("/register", async (req, res, next) => {
  const user = await User.find({ email: req.body.email }).exec();

  if (user.length >= 1) {
    return res.json({
      exist: true,
    });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.json({ message: err.message, error: err });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: hash,
          address: req.body.address,
          phone: req.body.phone,
        });
        console.log(user);
        await user.save();

        res.json({ msg: "success" });
      }
    });
  }
});

router.get("/login", (req, res, next) => {
  res.json({ msg: "Login page" });
});

router.post("/login", async (req, res, next) => {
  const users = await User.find({ email: req.body.email }).exec();

  if (users.length < 1) {
    res.json({ valErr: true });
  } else {
    bcrypt.compare(req.body.password, users[0].password, (err, result) => {
      if (err) {
        res.json({ valErr: true });
      }
      if (result) {
        req.session.email = users[0].email;
        req.session.name = users[0].name;
        req.session.loggedIn = true;
        res.json({ msg: "success" });
      } else {
        res.json({ valErr: true });
      }
    });
  }
});

module.exports = router;
