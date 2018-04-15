'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetailsSchema = new Schema({
  tweet_id: {
    type: String,
    Required: 'Kindly enter the tweet id'
  },
  views: {
    type: Number
  },
  upvote: {
    type: Number
  },
  downvote: {
    type: Number
  }
});

module.exports = mongoose.model('TweetDetails', DetailsSchema);
