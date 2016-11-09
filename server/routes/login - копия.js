var express = require('express');
var session = require('express-session');
var passport =require('passport');
var crypto =require('crypto');
var q = require('q');

var userModel = require('../model/user.js');
var loginCtrl = require('../controller/login.js');

var loginRouter = express.Router();

module.exports = loginRouter;

loginRouter.post('/login', function(req, res, next) {
        q.all([
            loginCtrl.getUserByUsername(req.body.username), 
            loginCtrl.getUserByPassword(req.body.password)
        ])
        .then(function(result){
            var userByUsername = result[0];
            var userByPassword = result[1];
            if(!userByUsername || !userByPassword){
                res.json({
                    loginSuccess: false,
                    message: 'Username or password is wrong'
                });   
            } else if(userByUsername.local.isUserConfirmedViaEmail === false){// not confirmed
                res.json({
                    loginSuccess: false,
                    message: 'Chech your email and confirm your account'
                });
            } else{
                next()
            }
        })
        .catch(function(err){
            console.log('/login err', err);
            next(err);
        })
    },
    passport.authenticate('login', {
        failureRedirect: '/'
    }),
    function(req, res, next) {
        // console.log('login req', req.user); // authenticate user
        res.json({
            loginSuccess: true,
            user: req.user
        });
    });

loginRouter.post('/registration', function(req, res, next) {
    var hash = crypto.randomBytes(16).toString('hex');
    var user = req.body;
    console.log(user, 'user');

    q.all([
        loginCtrl.getUserByUsername(user.username),
        loginCtrl.getUserByEmail(user.email)        
    ])
    .then(function(result){
        console.log('result', result);
        var isUsernameExist = result[0];
        var isEmailExist = result[1];

        // if(isUsernameExist){
        //     console.log('if');
        //     res.json({
        //         successRegistered: false,
        //         message: 'This username already exist'
        //     });
        // } else if(isEmailExist){
        //     console.log('else if');
        //     res.json({
        //         successRegistered: false,
        //         message: 'This email already exist'
        //     });
        // } else {
            console.log('else');
            user.registrationKey = hash;
            var newUser = {
                local: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    registrationKey: hash
                }
            };
            var newUserModel = new userModel(newUser);
            newUserModel.save(function(){
                console.log('arguments.length', arguments.length);
                return q.when('data');
            })
            // console.log('app: ', Object.keys(userModel.create));
            // return userModel.create(newUser); 
            // return q.when('data');
            /*
            userModel.create(newUser, function(err, user){
                if (err) {
                    return q.when(err);
                } else {
                    return q.when(user);
                }
            }); 
            */
        // }
    })
    .then(function(user){
        console.log('sendEmail user', user);
        if(user){
            // loginCtrl.sendEmail(user.local.email, hash, req, next);
            res.json({
                successRegistered: true,
                user: user
            });
        } 
    })
    .catch(function(err){
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
    passport.authenticate('facebook'), function(req, res, next){
        res.render('index');
    });

loginRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
    function(req, res) {
        res.redirect('/todos');
    });

