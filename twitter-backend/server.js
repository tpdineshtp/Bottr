var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  User = require('./api/models/userModel'),
  Tweet = require('./api/models/tweetsModel'),
  bodyParser = require('body-parser');

var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/twitter-bottr');
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('apollo API server started on: ' + port);
