var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];

mongoose.connect(config.db);
var dbConnection = mongoose.connection;

mongoose.Promise = require('q').Promise;

dbConnection.on('error', console.error.bind(console, 'Connection error ...'));
dbConnection.once('open', function() {
    console.log('MongoDB opened');
});

module.exports = {
	connection: dbConnection
};

