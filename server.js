var express = require('express');
var bodyParser = require('body-parser')

var Beer = require('./beerModel.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers');

var app = express();

var beers = [{ name: '512 IPA', style: 'IPA', image_url: 'http://bit.ly/1XtmB4d', abv: 5 },
{ name: '512 Pecan Porter', style: 'Porter', image_url: 'http://bit.ly/1Vk5xj4', abv: 4 }];




app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Handles Success / Failure , and Returns data
var handler = function (res, next) {
    return function (err, data) {
        if (err) {
            return next(err);
        }
        res.send(data);
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////
//get\post etc..

app.get('/beers', function (req, res, next) {
    Beer.find(handler(res, next));
});



// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function() {
  console.log("yo yo yo, on 8000!!")
});

