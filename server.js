var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var beerRoutes = require('./routes/beerRoutes');
var userRoutes = require('./routes/userRoutes');
var User = require("./models/UserModel");


mongoose.connect('mongodb://localhost/beers');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure passport and session middleware
app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//This tells the server that when a request comes into '/beers'
//that it should use the routes in 'beerRoutes'
//and those are in our new beerRoutes.js file
app.use('/beers', beerRoutes);
app.use('/users', userRoutes);

///////////////////error handlingg //////////////////////////////////////////////////////////////////////
//this below route will make sure index.html is served
//for any unhandled routes
//this allows html5 mode to be used
//notice the '[^.]+' this is a regular expression
//it is there so that requests to files that are not found 
//are not served by this route
//instead they will be given a 404 error
app.all('[^.]+', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

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

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})
///// listen..

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});

