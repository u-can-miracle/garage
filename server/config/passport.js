var q = require('q');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var fbStrategy = require('passport-facebook').Strategy;

var env = process.env.NODE_ENV || 'development';
var fbCallback = require('./config.js')[env].facebookCallback;
var loginCtrl = require('../controller/login.js');
var UserModel = require('../model/user.js');

module.exports = function(app) {
	console.log('login');
	passport.use('login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, cb){
		loginCtrl.getUserByUsername(username)
			.then(function(user){
				if(user){
					return cb(null, user);
				} else {
					return cb(null, false);
				}
			})
			.catch(function(err){
				console.log('passport local login err', err);
			});		
	}));

    passport.use('local-confirm-email', new localStrategy({
        usernameField: 'hash',
        passwordField: 'hash'
    }, function(hash, sameHash, cb){
    	process.nextTick(function(){
	    	loginCtrl.getUserByHash(hash)
	    		.then(function(user){
	    			if(!user){
	    				console.log('!user');
	    				return cb(null, false);
	    			} else {
	    				console.log('user hash', hash);
	    				return q.all([cb(null, user), loginCtrl.updateUserEmailConfirmation(hash)])
	    			}
	    		})
	    		.catch(function(err){
	    			console.log('local-confirm-email err', err);
	    		});
    	});
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
	        			console.log('facebook.id user', user);

	        			if(!user){
	        				var newUser = {};
	        				newUser['facebook'] = {};
	        				newUser.facebook.id = profile.id;
	        				newUser.facebook.name = profile.displayName;
	        				newUser.facebook.accessToken = accessToken;
	        				UserModel.create(newUser, function(err){
	        					if(err){
	        						console.log('err', err);
	        					} else {
	        						console.log('newUser', newUser);
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