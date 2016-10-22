var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    registrationKey: String,
    isRegistered: { type: Boolean, default: false }
});

var User = mongoose.model('User', userSchema);

module.exports = User;