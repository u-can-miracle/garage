var env = process.env.NODE_ENV || 'development';

module.exports = {
     'facebookAuth': {
        'clientID': '232887263793854', // your App ID
        'clientSecret': '904a23224a8d804920ee55e1e882b10e', // your App Secret
        'callbackURL': 'http://localhost:5000/auth/facebook/callback'        					
    }
};
