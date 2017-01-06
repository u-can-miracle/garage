var loginRouter = require('./login.js');
var projectsRouter = require('./projects.js');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use(function(req, res, next){
        console.log('req.user: ', req.user);
        console.log('----------------');
        next();
    });

    app.use('', loginRouter);
    app.use('', projectsRouter);
    


    app.use(function(req, res, next){
        console.log('rout not found');
        res.render('index');
    });    
};

