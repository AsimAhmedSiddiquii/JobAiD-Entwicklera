const router = require("express").Router();
const checkLogin = require('../middlewares/login');

const Blogs = require("../models/blogs");

router.get("/", checkLogin, async (req, res, next) => {
  var blogData  = await Blogs.find()
  res.render("blog/blogs", { blogData });
});

router.post("/", async (req, res, next) => {
  var blogData = new Blogs({
    title: req.body.title,
    text: req.body.text,
    url: req.body.url
  })
  await blogData.save();
  res.json('success')
});

module.exports = router;
