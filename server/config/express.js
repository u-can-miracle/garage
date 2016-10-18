var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


var expressConfig = function(app){
    app.set('view engine', 'ejs');
    app.set('views', './client/src');
    app.use(express.static('client/src'));

    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser());
    app.use(session({
        secret: 'super secret',
        cookie: {
            secure: true
        }, 
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};


module.exports = expressConfig;
