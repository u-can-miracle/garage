var loginRouter = require('./login.js');
var projectRouter = require('./project.js').projectRouter;
var taskRouter = require('./task.js').taskRouter;


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use(function(req, res, next){
    	console.log('req.user', req.user);
    	next();
    });
    

    app.use('', loginRouter);
    app.use('', projectRouter);
    app.use('', taskRouter);
    


    app.use(function(req, res, next){
        // console.log('------  rout not found ------');
        res.redirect('/login');
    });    
};

