var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');


router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/signup', function(req, res) {
  res.render('signup', {
    title: 'Create an account',
    signupUrl: '/authenticate/signup',
    signupMsg: req.flash('signupMsg')
  });
});

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  }
  res.render('login', {
    title: 'Log in',
    loginUrl: '/authenticate/login',
    loginMsg: req.flash('loginMsg')
  });
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {
    user: req.user,
    logoutUrl: '/authenticate/logout'
  });
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // redirect them to the home page otherwise
  res.redirect('/');
}

module.exports = router;
