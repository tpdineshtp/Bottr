'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/*
download resume
*/
exports.download_resume = function(req, res) {
  var file = __dirname + '/upload-folder/dinesh_resume.pdf';
  console.log(file);
  res.download(file);
};
