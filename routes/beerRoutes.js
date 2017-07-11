var express = require('express');
var router = express.Router();
var Beer = require("../models/beerModel");

// erroe handler
var handler = function (res, next) {
  return function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  }
};
//the beer routes go here
//get\post\put etc..


/// get the beers
router.get('/', function (req, res, next) {
  Beer.find(handler(res, next));
});

/// add beers 
router.post('/', function (req, res, next) {
  Beer.create(req.body, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      return res.send(beer);
    }
  });
});

/// delete beer by id
router.delete('/:id', function (req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});



/// update a beer

router.put('/:id', function (req, res, next) {
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

/// adds rating
router.post('/:id/ratings', function (req, res, next) {
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


///// Reviews section! ////

//// add a review
router.post('/:id/reviews', function (req, res, next) {
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

/// delete a review

router.delete('/:beerId/:reviewId', function (req, res, next) {
  var beer_id = req.params.beerId;
  var review_id = req.params.reviewId;
  var delete_review = { $pull: { reviews: { _id: review_id } } };
  Beer.findByIdAndUpdate(beer_id, delete_review, { new: true }, function (err, foundBeer) {
    if (err) {
      return next(err);
    } else {
      res.send(foundBeer);
    }
  });
});

module.exports = router;