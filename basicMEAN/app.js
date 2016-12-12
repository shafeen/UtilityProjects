var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('express-flash');

// connect to the database
var databaseConfig = require('./config/database.js');
databaseConfig(mongoose);

// configure passportjs for login and signup
var passportConfig = require('./config/passport.js');
passportConfig(passport);

var index = require('./routes/index');
var authenticate = require('./routes/authenticate')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function denyTemplateFiles(req, res, next) {
    if (req.originalUrl.endsWith('.pug') ) {
        res.status(403).send('Restricted resource!');
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, 'ng-client')));
app.use(express.static(path.join(__dirname, 'public')));

// setup app to use passportjs
// note: change secure to false for an https site
app.use(session({
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
app.use('/', index);
app.use('/partials', require('./routes/partials'));
app.use('/authenticate', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
