var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/UserModel");


// erroe handler
var handler = function (res, next) {
  return function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  }
};

//get/post/put/delete etc..

//register
router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
     res.send({ username: req.user.username });
    });
  });
});

//login
router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send({ username: req.user.username });
});

//logout
router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});



module.exports = router;