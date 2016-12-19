var q = require('q');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var fbStrategy = require('passport-facebook').Strategy;

var env = process.env.NODE_ENV || 'development';
var fbCallback = require('./config.js')[env].facebookCallback;
var loginCtrl = require('../controller/login.js');
var UserModel = require('../model/user.js');

module.exports = {
	passportStrategyConfiguration: passportStrategyConfiguration,

	/***   For testing   ***/
	loginHandleMiiddleware: loginHandleMiiddleware,
	localConfirmEmailMiddleware: localConfirmEmailMiddleware,
	fbLoginMiddleware: fbLoginMiddleware
}

function passportStrategyConfiguration(app) {
	passport.use('login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, loginHandleMiiddleware));

    passport.use('local-confirm-email', new localStrategy({
        usernameField: 'hash',
        passwordField: 'hash'
    }, localConfirmEmailMiddleware));

    passport.use(new fbStrategy({
            clientID: '232887263793854',
            clientSecret: '904a23224a8d804920ee55e1e882b10e',
            callbackURL: fbCallback
        }, fbLoginMiddleware));

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
}

function loginHandleMiiddleware(req, username, password, cb){
	return loginCtrl.getUserByUsername(username)
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
}

function localConfirmEmailMiddleware(hash, sameHash, cb){
	// return process.nextTick(function(){
		return loginCtrl.getUserByHash(hash)
			.then(function(user){
				if(!user){
					return cb(null, false);
				} else {
					return q.all([cb(null, user), loginCtrl.updateUserEmailConfirmation(hash)])
				}
			})
			.catch(function(err){
				console.log('local-confirm-email err', err);
			});
	// });
}

function fbLoginMiddleware(accessToken, refreshToken, profile, cb) {
	// return process.nextTick(function(){
		return UserModel.findOne({'facebook.id': profile.id})
			.then(function(user){
				if(!user){
					var newUser = {};
					newUser.facebook = {};
					newUser.facebook.id = profile.id;
					newUser.facebook.name = profile.displayName;
					newUser.facebook.accessToken = accessToken;

					return q.resolve(UserModel.create(newUser))
						.then(function(newUser){
							cb(null, newUser);
						})
						.catch(function(err){
							console.log('err', err);
						});
						console.log('after');
				} else {
					return cb(null, user);
				}
			})
			.catch(function(err){
				console.log('err', err);
			});
	// });
}
