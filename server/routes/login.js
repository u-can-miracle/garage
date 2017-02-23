var express = require('express');
var session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var q = require('q');

var userModel = require('../model/user.js');
var loginCtrl = require('../controller/login.js');

var loginRouter = express.Router();

module.exports = loginRouter;

loginRouter.get('/login', function(req, res, next) {
    if (req.user) {
        res.redirect('/project');
    } else {
        res.render('index');
    }
});


loginRouter.post('/login', function(req, res, next) {
    passport.authenticate('login', {
            session: true,
            failureRedirect: '/login'
        },
        function(err, user, info, asd) {
            if (err) {
                next(err); // will generate a 500 error
            }

            if (!user) {
                res.json({
                    loginSuccess: false,
                    message: req.flash('loginMessage')[0]
                });
            } else {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        loginSuccess: true,
                        user: req.user,
                        message: req.flash('loginMessage')[0]
                    });                
                });                 
            }
        })(req, res, next);
});


loginRouter.post('/registration', function(req, res, next) {
    var hash = crypto.randomBytes(16).toString('hex');
    var user = req.body;

    q.all([
            loginCtrl.getUserByUsername(user.username),
            loginCtrl.getUserByEmail(user.email)
        ])
        .then(function(result) {
            var isUsernameExist = result[0];
            var isEmailExist = result[1];

            if (isUsernameExist) {
                res.json({
                    successRegistered: false,
                    message: 'This username already exist'
                });
            } else if (isEmailExist) {
                res.json({
                    successRegistered: false,
                    message: 'This email already exist'
                });
            } else {
                user.registrationKey = hash;
                var newUser = {
                    local: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        registrationKey: hash
                    }
                };

                return userModel.create(newUser);
            }
        })
        .then(function(user) {
            if (user) {
                loginCtrl.sendEmail(user.local.email, hash, req, next);
                res.json({
                    successRegistered: true,
                    user: user
                });
            }
        })
        .catch(function(err) {
            console.log('catch', err);
            res.status(500);
            res.json(err);
        });
});

loginRouter.get('/confirm/:hash', function(req, res, next) {
        //http://stackoverflow.com/questions/39787623/passport-js-with-get-method
        //https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L71
        req.query = req.params; // GET to POST hack!
        next();
    },
    passport.authenticate('local-confirm-email', {
        failureRedirect: '/'
    }),
    function(req, res, next) {
        res.render('index');
    });


loginRouter.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res, next) {
        res.render('index');
    });

loginRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/todos');
    });

loginRouter.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
});