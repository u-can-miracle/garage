var loginRouter = require('./login');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use('', loginRouter);
    
    app.get('*', function(req, res) {
    	// is autentificate res.redirect('/todos');
    	// else 
    	console.log('*');
        res.redirect('/');
    });
};

