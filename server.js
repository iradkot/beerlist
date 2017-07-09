var express = require('express');
var bodyParser = require('body-parser')

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers');

var app = express();

var Beer = require('./beerModel.js');

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
///////////////////////////////////////////////////////////////////////////////////////////////
//get\post\put etc..


/// get the beers
app.get('/beers', function (req, res, next) {
  Beer.find(handler(res, next));
});

/// add beers 
app.post('/beers', function (req, res, next) {
  Beer.create(req.body, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      return res.send(beer);
    }
  });
});

/// delete beer by id
app.delete('/beers/:id', function (req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});


/// adds rating
app.post('/beers/:id/ratings', function (req, res, next) {
  //code a suitable update object 
  //using req.body to retrieve the new rating
  var updateObject = { $push: { ratings: req.body.rating } };

  Beer.findByIdAndUpdate(req.params.id, updateObject, { new: true }, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

/// update a beer

app.put('/beers/:id', function (req, res, next) {
  var updated_obj = req.body;
  console.log(updated_obj);
  Beer.findByIdAndUpdate(req.params.id, { $set: updated_obj }, { new: true }, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

//// add reviews
app.post('/beers/:id/reviews', function (req, res, next) {
  var updatedReviews = { $push: { reviews: req.body } };
  var id = req.params.id;
  Beer.findByIdAndUpdate(id, updatedReviews, { new: true }, function (err, review) {
    if (err) {
      return next(err);
    } else {
      res.send(review);
    }
  });
});




///////////////////error handlingg //////////////////////////////////////////////////////////////////////

// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});
///// listen..

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});

