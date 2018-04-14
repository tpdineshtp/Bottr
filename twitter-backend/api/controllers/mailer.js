'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');
var nodemailer = require('nodemailer');

/*
download resume
*/
exports.send_mail = function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'myinfowebsite.resume@gmail.com',
      pass: 'Dinesh&05'
    }
  });

  var text = "Name : "+req.body.Your_Name+", Email : "+req.body.Your_Email+", Number : "+req.body.Phone_Number+", Message : "+req.body.Message;

  var mailOptions = {
    from: 'myinfowebsite.resume@gmail.com',
    to: 'tpdineshtp@gmail.com',
    subject: 'Hire me request from My Info!',
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
};
