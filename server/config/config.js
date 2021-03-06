var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		// db: 'mongodb://localhost/localGarage',
		// db: 'mongodb://db_user:db_pass@ds015892.mlab.com:15892/heroku_gcrt5kf7',
		db:	'mongodb://user:password@ds015892.mlab.com:15892/heroku_gcrt5kf7',
		port: process.env.PORT || 5000,
		facebookCallback: 'http://localhost:5000/auth/facebook/callback'
	},
	production: {
		db:	'mongodb://user:password@ds015892.mlab.com:15892/heroku_gcrt5kf7',
		port: process.env.PORT || 80,
		facebookCallback: 'http://rubygarage-fullstack-js.heroku.com/auth/facebook/callback'
	}
}

module.exports = config[env];
