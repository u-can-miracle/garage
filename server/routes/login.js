var express = require('express');
var q = require('q');

var userModel = require('../model/user.js');
var loginCtrl = require('../controller/login.js');

var loginRouter = express.Router();



loginRouter.post('/registration', function(req, res, next) {
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
            return userModel.create(user); 
        }
    })
    .then(function(user){
        console.log('user', user);
        if(user){
            loginCtrl.sendEmail(user.email, req, next);
            res.json(user);
        }
    })
    .catch(function(err){
        console.log('catch', err);
        res.status(500);
        res.json(err);
    });
});



module.exports = loginRouter;

