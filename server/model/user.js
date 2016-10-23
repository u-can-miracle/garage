var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');
var User;

// var userSchema = new mongoose.Schema({
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    registrationKey: String,
    isRegistered: { type: Boolean, default: false }
});

// userSchema.plugin(passportLocalMongoose);
User = mongoose.model('User', userSchema);

module.exports = User;

