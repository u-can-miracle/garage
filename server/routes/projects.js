var express = require('express');
var projectsRouter = express.Router();
var projectCtrl = require('../controller/project.js');

module.exports = projectsRouter;

projectsRouter.get('/projects', ensureAuthenticated, function(req, res){
	res.render('index');
});

projectsRouter.post('/projects/create', function(req, res){
	projectCtrl.createProject(req.user.local._id)
		.then(function(proj){
			res.json({proj: proj});
		})
		.catch(function(){
			res.json({err: err});
		})
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}