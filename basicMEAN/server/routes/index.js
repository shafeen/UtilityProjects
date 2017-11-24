const express = require('express');
const router = express.Router();
const settings = require('../config/settings/settings.json');

const AUTHENTICATE_BASE_URL = '/authenticate';

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else {
        res.render('index');
    }
});

router.get('/signup', function (req, res) {
    res.render('signup', {
        title: 'Create an account',
        signupUrl: AUTHENTICATE_BASE_URL + '/signup',
        signupMsg: req.flash('signupMsg')
    });
});

router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    }
    res.render('login', {
        title: 'Log in',
        loginUrl: AUTHENTICATE_BASE_URL + '/login',
        loginMsg: req.flash('loginMsg')
    });
});

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user: req.user,
        logoutUrl: AUTHENTICATE_BASE_URL + '/logout'
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


// TODO: (shafeen) set up public and protected api routes & controllers

module.exports = router;
