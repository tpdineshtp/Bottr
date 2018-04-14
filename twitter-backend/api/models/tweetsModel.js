'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
  username: {
    type: String,
    Required: 'Kindly enter the username'
  },
  tweet: {
    type: String
  },

  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tweet', TweetSchema);
