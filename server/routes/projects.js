var express = require('express');
var projectsRouter = express.Router();

module.exports = projectsRouter;

projectsRouter.get('/projects', function(req, res){
	console.log('/projects req.user: ', req.user);
	res.render('index');
});

