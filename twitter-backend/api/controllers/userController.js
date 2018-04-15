'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tweet = mongoose.model('Tweet'),
    TweetDetails = mongoose.model('TweetDetails');

/*
  Adds a new tweet
  required: tweet info and user info
  output: ''
*/
exports.add_tweet = function(req, res) {
  var new_tweet = new Tweet(req.body);
  new_tweet.save(function(err, user) {
    if (err)
      res.send(err);
    res.status(200).send({});
  });
};

/*
  Returns all tweets of the current user
  required: username
  output: all tweets for the given user
*/
exports.get_all_tweet = function(req, res) {
  Tweet.find({username : req.body.username}, function(err, tweets) {
    if (err)
      res.send(err);

    res.status(200).send(tweets);
  });
};

/*
  Returns single tweet's information such as view, upvote, downvote for the particular id
  required: tweet id
  output: all the information of the given tweet
*/
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

/*
  updates tweet's upvote information
  required: tweet id
  output: updated tweet information
*/
exports.upvote_tweet = function (req, res) {
  TweetDetails.findOneAndUpdate({tweet_id: req.params.id}, {$inc: {upvote:1}}, {new: true, upsert: true}, function(err, doc){
    if(err){
        res.send(err);
    }
    res.status(200).send(doc);
  });
}

/*
  updates tweet downvote information
  required: tweet id
  output: updated tweet information
*/
exports.downvote_tweet = function (req, res) {
  TweetDetails.findOneAndUpdate({tweet_id: req.params.id}, {$inc: {downvote:1}}, {new: true, upsert: true}, function(err, doc){
      if(err){
          res.send(err);
      }
      res.status(200).send(doc);
  });
}
