var mongoose = require('mongoose');
var User;

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	local: {
	    username: {
	        type: String,
	        unique: true
	    },
	    email: {
	        type: String,
	        unique: true
	    },
	    password: String,
	    registrationKey: String
	},
    facebook: {
        id: String,
        accessToken: String,
        name: String
    }
});

User = mongoose.model('User', userSchema);

module.exports = User;

