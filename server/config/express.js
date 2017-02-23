var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = require('./db');
var flash = require('connect-flash');



module.exports = function expressConfig(app) {
    app.set('view engine', 'ejs');
    app.set('views', './client/src');
    app.use(express.static('client/src'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(flash());

    app.use(cookieParser());
    app.use(session({
        secret: 'super secret',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: db.connection,
            collection: 'sessions'
        })
    }));
};