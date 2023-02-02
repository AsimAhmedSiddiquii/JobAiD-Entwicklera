const express = require("express");
const app = express();

var createError = require("http-errors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB,
  {
    dbName: "tsec",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connected");
    }
  }
);

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const authRoute = require("./routes/auth");

const resumeRoute = require("./routes/resume");

const jobRoute = require("./routes/job");

app.use("/", authRoute);
app.use("/resume", resumeRoute);
app.use("/job", jobRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
