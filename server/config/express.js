var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var userModel = require('../model/user.js');
var passportConfig = require('./passport.js');

var expressConfig = function(app){
    app.set('view engine', 'ejs');
    app.set('views', './client/src');
    app.use(express.static(path.resolve(__dirname, 'client/src')));

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

    passportConfig(app);
};


module.exports = expressConfig;
