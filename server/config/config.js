module.exports = {
	development: {
		db: 'mongodb://localhost/garage',
		port: process.env.PORT || 5000
	},
	production: {
		db: '',
		port: process.env.PORT || 80
	}
};