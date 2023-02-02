const router = require('express').Router();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'siddiquimim.s@gmail.com',
      pass: 'pmlhtykwnzaodvsn'
    }
  });
  
  var mailOptions = {
    from: 'siddiquimim.s@gmail.com',
    to: 'shaikhataurrehman0@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  

router.get('/',(req,res,next)=>{
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
})

module.exports = router;