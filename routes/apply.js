const router = require('express').Router();
const checkLogin = require('../middlewares/login');
const Resume = require('../models/resume');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'siddiquimim.s@gmail.com',
      pass: 'pmlhtykwnzaodvsn'
    }
  });

router.get('/', checkLogin, async (req,res,next)=>{
  var userData = await Resume.findOne({userId: req.session.userid}).populate('userId');
  console.log(userData);
  
  var html =  `<!DOCTYPE html>
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
  
  <h2>Resume</h2>
  
  <table>
    <tr>
      <th colspan='2' >Personal Details</th>
      
    </tr>
    <tr>
      <th>Name</th>
      <td>` + userData.name + `</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>` + userData.email + `</td>
    </tr>
    
    <tr>
      <th>Address</th>
      <td>` + userData.address + `</td>
    </tr>
    <tr>
      <th>Phone</th>
      <td>` + userData.phone + `</td>
    </tr>
    
    <tr>
      <th colspan='2' >Educational Details</th>
      
    </tr>
    <tr>
      <th>Institute Name</th>
      <td>` + userData.institute_name + `</td>
    </tr>
    <tr>
      <th>Degree Title</th>
      <td>` + userData.degree_title + `</td>
    </tr>
      
    <tr>
      <th colspan='2' >Work Experience</th>
      
    </tr>
    <tr>
      <th>Company Name</th>
      <td>` + userData.company_name + `</td>
    </tr>
    <tr>
      <th>Role</th>
      <td>` + userData.role + `</td>
    </tr>
    
    <tr>
      <th>Year of Experience</th>
      <td>` + userData.yoe + `</td>
    </tr>
    
    <tr>
      <th colspan='2' >Skills</th>
    </tr>
    <tr>
      <td>` + userData.skills + `</td>
    </tr>
    
  </table>
  
  </body>
  </html>
  `

  var mailOptions = {
    from: 'siddiquimim.s@gmail.com',
    to: 'shaikhataurrehman0@gmail.com',
    subject: 'Sending Email using Node.js',
    html: html
  };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
})

module.exports = router;