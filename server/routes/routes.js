var loginRouter = require('./login.js');
var projectsRouter = require('./projects.js');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use(function(req, res, next){
        // console.log('req.logIn', req.logIn);
        console.log('req.user: ', req.user);
        console.log('req: ', 'req');
        console.log('----------------');
        next();
    });

    app.use('', loginRouter);
    app.use('', projectsRouter);
    


    app.use(function(req, res, next){
        // console.log('req.logIn', req.logIn);
        console.log('req.user: ', req.user);
        console.log('req: ', 'req');
        console.log('================');
        next();
    });    
    // app.get('*', function(req, res) {
    // 	// is autentificate res.redirect('/todos');
    // 	// else 
    //     console.log('*')
    //     res.redirect('/login');
    // });
};

