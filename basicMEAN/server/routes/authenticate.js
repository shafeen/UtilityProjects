const express = require('express');
const router = express.Router();

const URL_SIGNUP_SUCCESS = '/profile';
const URL_SIGNUP_FAILURE = '/signup';
const URL_LOGIN_SUCCESS  = '/profile';
const URL_LOGIN_FAILURE  = '/login';
const URL_LOGOUT_SUCCESS = '/';

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect(URL_LOGOUT_SUCCESS);
});

module.exports = function(passport) {
    router.post('/signup', function(req, res, next){
        console.log('Starting Signup..');
        return next();
    }, passport.authenticate('local-signup', {
        successRedirect: URL_SIGNUP_SUCCESS,
        failureRedirect: URL_SIGNUP_FAILURE,
        failureFlash: true
    }));

    router.post('/login',
        function(req, res, next){
            console.log('Starting Login..');
            return next();
        },
        passport.authenticate('local-login', {
        successRedirect: URL_LOGIN_SUCCESS,
        failureRedirect: URL_LOGIN_FAILURE,
        failureFlash: true
    }));

    return router;
};
