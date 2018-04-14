'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tweet = mongoose.model('Tweet');

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

/*
Authenticates a user given username and password as Strings
*/
exports.authenticate_user = function(req, res) {
  User.findOne({ username : req.body.username, password: req.body.password }, function(err, user) {
    if (err)
      res.send(err);
    // Username not exists in DB
    if(user === null) {
      res.status(404).send({});
    }
    else{
      res.json(user);
    }
  });
};

exports.test_url = function(req, res) {
  res.status(200).send({});
};
