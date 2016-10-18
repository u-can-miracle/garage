module.exports = {
	development: {
		db: 'mongodb://fullstack-js:fullstack-js@ds061076.mlab.com:61076/heroku_9x0jm97v',
		port: process.env.PORT || 5000
	},
	production: {
		db: 'mongodb://fullstack-js:fullstack-js@ds061076.mlab.com:61076/heroku_9x0jm97v',
		port: process.env.PORT || 80
	}
};