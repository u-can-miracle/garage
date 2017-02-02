var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		db: 'mongodb://localhost/localGarage',
		// db: 'mongodb://fullstack-js:fullstack-js@ds061076.mlab.com:61076/heroku_9x0jm97v',
		port: process.env.PORT || 5000,
		facebookCallback: 'http://localhost:5000/auth/facebook/callback'
	},
	production: {
		db: 'mongodb://fullstack-js:fullstack-js@ds061076.mlab.com:61076/heroku_9x0jm97v',
		port: process.env.PORT || 80,
		facebookCallback: 'http://rubygarage-fullstack-js.heroku.com/auth/facebook/callback'
	}
}

module.exports = config[env];
