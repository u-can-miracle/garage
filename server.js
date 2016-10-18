var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'development';


var config = require('./server/config/config')[env];


require('./server/config/express')(app);


app.get('*', function(req, res){
	res.send('index');
});

app.listen(config.port, function(){
	console.log('App started on port ' + config.port);
});