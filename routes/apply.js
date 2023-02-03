const router = require("express").Router();
const checkLogin = require("../middlewares/login");
const Resume = require("../models/resume");
const Apply = require("../models/apply");
const Jobs = require("../models/job");

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siddiquimim.s@gmail.com",
    pass: "pmlhtykwnzaodvsn",
  },
});

router.get("/:title/:company", checkLogin, async (req, res, next) => {
  var job = await Jobs.findOne({
    title: req.params.title,
    company: req.params.company,
  });

  var applyData = new Apply({
    userId: req.session.userid,
    jobId: job._id,
  });

  await applyData.save();

  var userData = await Resume.findOne({ userId: req.session.userid }).populate(
    "userId"
  );
  console.log(userData);

  var html =
    `<!DOCTYPE html>
  <html>
  <head>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  </style>
  </head>
  <body>
  
  <h5> Dear Hiring Managaer,</h5>
  <h4>Applied for ` + job.title + ` at ` + job.company + `</h4>
  
  <table>
    <tr>
      <th colspan='2' style="text-align: center">Personal Details</th>
      
    </tr>
    <tr>
      <th>Name</th>
      <td>` +
    userData.userId.name +
    `</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>` +
    userData.userId.email +
    `</td>
    </tr>
    
    <tr>
      <th>Address</th>
      <td>` +
    userData.userId.address +
    `</td>
    </tr>
    <tr>
      <th>Phone</th>
      <td>` +
    userData.userId.phone +
    `</td>
    </tr>
    
    <tr>
      <th colspan='2' style="text-align: center">Educational Details</th>
      
    </tr>
    <tr>
      <th>Institute Name</th>
      <td>` +
    userData.education_experience[0].institute_name +
    `</td>
    </tr>
    <tr>
      <th>Degree Title</th>
      <td>` +
    userData.education_experience[0].degree_title +
    `</td>
    </tr>
      
    <tr>
      <th colspan='2' style="text-align: center">Work Experience</th>
      
    </tr>
    <tr>
      <th>Company Name</th>
      <td>` +
    userData.work_experience[0].company_name +
    `</td>
    </tr>
    <tr>
      <th>Role</th>
      <td>` +
    userData.work_experience[0].role +
    `</td>
    </tr>
    
    <tr>
      <th>Year of Experience</th>
      <td>` +
    userData.work_experience[0].yoe +
    `</td>
    </tr>
    
    <tr>
      <th colspan='2' style="text-align: center">Skills</th>
    </tr>
    <tr>
      <td colspan='2' >` +
    userData.skills +
    `</td>
    </tr>
    
  </table>
  
  </body>
  </html>
  `;

  var mailOptions = {
    from: "siddiquimim.s@gmail.com",
    to: "shaikhataurrehman0@gmail.com",
    subject: "Sending Email using Node.js",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/apply/applied");
    }
  });
});

router.get("/applied", checkLogin, async (req, res, next) => {
  var appliedData = await Apply.find({ userId: req.session.userid }).populate(
    "jobId"
  );
  res.render("job/applied", { appliedData });
});

module.exports = router;
