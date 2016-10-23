var express = require('express');
var passport = require('passport');

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
            return userModel.create(user); 
        }
    })
    .then(function(user){
        console.log('user', user);
        if(user){
            loginCtrl.sendEmail(user.email, hash, req, next);

            userModel.register(new userModel({
                username: req.body.username
            }), req.body.password, function(err, account) {
                if (err) {
                    return res.render('index');
                }

                passport.authenticate('local')(req, res, function() {
                    res.json(user);
                });
            });


            // res.json(user);
        } 
    })
    .catch(function(err){
        console.log('catch', err);
        res.status(500);
        res.json(err);
    });
});


loginRouter.get('/confirm/:hash', passport.authenticate('confirmRegistration', {
    successRedirect: '/todos',
    failureRedirect: '/login',
    failureFlash: true
}, function(){
    console.log('confirmRegistration callback arguments', arguments);
}), function(req, res, next){
    console.log('render');
    res.render('index');
});

