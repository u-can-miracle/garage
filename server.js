var express = require('express');
var app = express();

var config = require('./server/config/config.js');

require('./server/config/db.js'); // mongo init
require('./server/config/express.js')(app);
require('./server/config/passport.js').passportStrategyConfiguration(app);

var routes = require('./server/routes/routes.js');



routes(app);



app.listen(config.port, function(){
	console.log('App started on port ' + config.port);
});

module.exports = app;   // For testing
