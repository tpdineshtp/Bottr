'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tweet = mongoose.model('Tweet'),
    TweetDetails = mongoose.model('TweetDetails');

/*
Registers a new user
*/
exports.add_tweet = function(req, res) {
      var new_tweet = new Tweet(req.body);
      new_tweet.save(function(err, user) {
        if (err)
          res.send(err);
        res.status(200).send({});
      });
};

exports.get_all_tweet = function(req, res) {
      console.log(req.body.username)
      Tweet.find({username : req.body.username}, function(err, tweets) {
      if (err)
      res.send(err);
      res.status(200).send(tweets);
      });
};

exports.get_tweet = function (req,res){
  var result = [];

  TweetDetails.findOneAndUpdate({tweet_id: req.params.id}, {$inc: {views:1}}, {new: true, upsert: true}, function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
      }
      result.push(doc);
      Tweet.findById(req.params.id, function(err, tweet) {
      if (err)
        res.send(err);
      result.push(tweet);
      res.json(result);
    });
  });
}

exports.upvote_tweet = function (req, res) {
  TweetDetails.findOneAndUpdate({tweet_id: req.params.id}, {$inc: {upvote:1}}, {new: true, upsert: true}, function(err, doc){
      if(err){
          res.send(err);
      }
      res.status(200).send(doc);
  });
}

exports.downvote_tweet = function (req, res) {
  TweetDetails.findOneAndUpdate({tweet_id: req.params.id}, {$inc: {downvote:1}}, {new: true, upsert: true}, function(err, doc){
      if(err){
          res.send(err);
      }
      res.status(200).send(doc);
  });
}
