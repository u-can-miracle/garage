var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'development';

var config = require('./server/config/config.js')[env];
var db = require('./server/model/db'); // mongo init

var routes = require('./server/routes/routes.js');

require('./server/config/express.js')(app);



routes(app);



app.listen(config.port, function(){
	console.log('App started on port ' + config.port);
});


