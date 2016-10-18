var mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection error ...'));
	db.once('open', function(){
		console.log('MongoDB opened');
	});

	var userSchema = mongoose.Schema({
		firstname: String,
		lastname: String,
		username: String,
		password: String
	});

	var User = mongoose.model('User', userSchema); 

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			User.create({firstname: 'Joe', lastname: 'Smith', username: 'jojo', password: 'salt'});
			User.create({firstname: 'John', lastname: 'Papa', username: 'john', password: 'salt'});
			User.create({firstname: 'Dan', lastname: 'Hustom', username: 'dan', password: 'salt'});
		}
	});		
};

