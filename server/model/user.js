var mongoose = require('mongoose');
var User;
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = require('q').Promise;

var userSchema = mongoose.Schema({
	local: {
	    username: {
	        type: String
	    },
	    email: {
	        type: String
	    },
	    password: String,
	    registrationKey: String,
	    isUserConfirmedViaEmail: {
	    	type: Boolean,
	    	default: false
	    }
	},
    facebook: {
        id: String,
        accessToken: String,
        name: String
    }
});



userSchema.plugin(passportLocalMongoose, {
	usernameField: 'local.username'
});



User = mongoose.model('User', userSchema);

module.exports = User;

