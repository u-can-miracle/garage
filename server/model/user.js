var mongoose = require('mongoose');
var User;

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

User = mongoose.model('User', userSchema);

module.exports = User;

