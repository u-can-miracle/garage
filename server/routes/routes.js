var loginRouter = require('./login.js');
var todosRouter = require('./todos.js');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use('', loginRouter);
    app.use('', todosRouter);
    
    app.get('*', function(req, res) {
    	// is autentificate res.redirect('/todos');
    	// else 
        res.redirect('/');
    });
};

