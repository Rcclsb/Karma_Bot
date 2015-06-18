
var express = require('express');
var bodyParser = require('body-parser');
var karmabot = require('./karmabot');
var connection = require('./connectiontester');
var redis = require('redis')
var app = express();
var port = process.env.PORT || 3000;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('我这么聪明的') });
app.post('/karma', karmabot);
app.post('/testconnect', connection);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Karma_Bot listening on port ' + port);
});

