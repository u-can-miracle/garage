var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var fbStrategy = require('passport-facebook').Strategy;

var env = process.env.NODE_ENV || 'development';
var fbCallback = require('./config.js')[env].facebookCallback;
var loginCtrl = require('../controller/login.js');
var UserModel = require('../model/user.js');

module.exports = function(app) {


    passport.use('local-confirm-email', new localStrategy({
        usernameField: 'true',
        passwordField: 'facebook',
    	passReqToCallback: true
    }, function(req, username, password, cb){
    	req.query = req.params; // GET to POST simulator!
    	console.log(arguments);
    	console.log('local-confirm-email');
    	console.log(req);
    	return cb(null, false);
    	// process.nextTick(function(){
	    // 	loginCtrl.getUserByHash(password)
	    // 		.then(function(user){
	    // 			console.log('local-confirm-email user', user);
	    // 			if(!user){
	    // 				console.log('!user');
	    // 				return cb(null, false);
	    // 			} else {
	    // 				console.log('user');
	    // 				// UserModel.update({''})
	    // 				return cb(null, user);
	    // 			}
	    // 		})
	    // 		.catch(function(err){
	    // 			console.log('local-confirm-email err', err);
	    // 		});
    	// });
    }));

    passport.use(new fbStrategy({
            clientID: '232887263793854',
            clientSecret: '904a23224a8d804920ee55e1e882b10e',
            callbackURL: fbCallback
        },
        function(accessToken, refreshToken, profile, cb) {
        	process.nextTick(function(){
        		UserModel.findOne({'facebook.id': profile.id})
	        		.then(function(user){
	        			if(!user){
	        				var newUser = new UserModel();
	        				newUser.facebook.id = profile.id;
	        				newUser.facebook.name = profile.displayName;
	        				newUser.facebook.accessToken = accessToken;
	        				newUser.save(function(err){
	        					if(err){
	        						console.log('err', err);
	        					} else {
	        						return cb(null, newUser);
	        					}
	        				})
	        			} else {
	        				return cb(null, user);
	        			}
	        		})
	        		.catch(function(err){
	        			console.log('err', err);
	        		});
        	});
        }));

    app.use(passport.initialize());
    app.use(passport.session());

        passport.serializeUser(function(user, cb) {
    	console.log('serializeUser');
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
    	console.log('deserializeUser');
        cb(null, obj);
    });
};