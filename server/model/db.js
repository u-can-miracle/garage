var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];

mongoose.connect(config.db);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error ...'));
db.once('open', function() {
    console.log('MongoDB opened');
});