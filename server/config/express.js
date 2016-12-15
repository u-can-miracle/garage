var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');



module.exports = function expressConfig(app){
    app.set('view engine', 'ejs');
    app.set('views', './client/src');
    app.use(express.static('/client/src'));

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
};
