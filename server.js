var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'development';


var config = require('./server/config/config')[env];


require('./server/config/express')(app);
require('./server/config/mongoose')(config);


app.get('/', function(req, res){
	res.render('index');
});
app.get('*', function(req, res){
	res.redirect('login');
});

app.listen(config.port, function(){
	console.log('App started on port ' + config.port);
});