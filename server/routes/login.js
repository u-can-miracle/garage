var express = require('express');
var session = require('express-session');
var passport =require('passport');
var crypto =require('crypto');
var q = require('q');

var userModel = require('../model/user.js');
var loginCtrl = require('../controller/login.js');

var loginRouter = express.Router();

module.exports = loginRouter;


loginRouter.post('/registration', function(req, res, next) {
    var hash = crypto.randomBytes(16).toString('hex');
    var user = req.body;

    q.all([
        loginCtrl.isUsernameExist(user.username),
        loginCtrl.isEmailExist(user.email)        
    ])
    .then(function(result){
        var isUsernameExist = result[0];
        var isEmailExist = result[1];
        if(isUsernameExist){
            console.log('usernameAlreadyExist');
            res.json({usernameAlreadyExist: true});  
        } else if(isEmailExist){
            console.log('emailAlreadyExist');
            res.json({emailAlreadyExist: true});
        } else {
            console.log('result', result);
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
    .then(function(user){
        // console.log('user', user);
        if(user){
            loginCtrl.sendEmail(user.local.email, hash, req, next);
            res.json(user);
        } 
    })
    .catch(function(err){
        console.log('catch', err);
        res.status(500);
        res.json(err);
    });
});

loginRouter.get('/confirm/:hash', passport.authenticate('local-confirm-email'/*, {
    successRedirect: 'todos',
    failureRedirect: '/'
}*/)/*, function(req, res, next){
    console.log('/confirm/:hash');
    req.render('index');
}*/);
// loginRouter.get('/confirm/:hash', function(req, res, next){
//     req.query = req.params; // GET to POST simulator!
//     passport.authenticate('local-confirm-email', function(err, user, info) {
//         console.log(arguments);
//         if (err) {
//             console.log('Error info: ', info);
//         } else if (!user) {
//             console.log('User not found: ', info)
//         } else {
//             console.log('User activated')
//         }
//         res.redirect('/');
//     })(req, res, next);
// });

// loginRouter.get('/confirm/:hash', function(req, res, next){
//     var hash = req.params.hash;
//     loginCtrl.getUserByHash(hash)
//         .then(function(user){
//             if(user){
//                 console.log('user = ' , user);
//                 console.log('user.username = ', user.username);
//                 req.session.userName = user.username;
//             }
//             res.render('index');
//         })
//         .catch(function(err){
//             console.log('err', err);
//             res.render('index');
//         });
// });



loginRouter.get('/auth/facebook',
    passport.authenticate('facebook'), function(req, res, next){
        console.log('fb');
        res.render('index');
    });

loginRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
    function(req, res) {
        console.log('fb cb');
        res.redirect('/todos');
    });
