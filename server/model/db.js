var mongoose = require('mongoose');
var User = require('./user');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];

mongoose.connect(config.db);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error ...'));
db.once('open', function() {
    console.log('MongoDB opened');
});

User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
        User.create({
            username: 'jojo',
            email: 'Smith',
            password: 'salt'
        });
        User.create({
            username: 'john',
            email: 'Papa',
            password: 'salt'
        });
    }
});