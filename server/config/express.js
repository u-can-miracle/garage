var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var loginCtrl = require('../controller/login.js');
var userModel = require('../model/user.js');

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

    // Set passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Serialize user
    passport.serializeUser(function(user, done){
        console.log('serializeUser');
        return done(null, user._id);
    });

    // Deserialize user
    passport.deserializeUser(function(id, done){
        console.log('deserializeUser');
        userModel.findById(id, function(err, user){
            done(err, user);
        });
    });

    console.log('express config');

    // Register strategy
    passport.use('confirmRegistration', new LocalStrategy(
        {passReqToCallback: true},
        function(req, username, password, done){
            console.log('Register strategy');
            loginCtrl.getUserByHash(req.params.hash)
                .then(function(user){
                    console.log('user', user);
                    return done(null, user);
                })
                .catch(function(err){
                    console.log('err = ', err);
                    return done(err);
                });
        }
    ));

};


module.exports = expressConfig;
