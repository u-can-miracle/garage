var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    'registration-key': { type: String, default: '' }
});

var User = mongoose.model('User', userSchema);

module.exports = User;