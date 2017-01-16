var express = require('express');
var projectRouter = express.Router();
var projectCtrl = require('../controller/project.js');

module.exports = projectRouter;

projectRouter.get('/project', ensureAuthenticated, function(req, res){
	res.render('index');
});


projectRouter.get('/projects/getAll', ensureAuthenticated, function(req, res){
	projectCtrl.getAllProjects(req.user._id)
		.then(function(allProjects){
			console.log('router allProjects', allProjects);
			res.json({allProjects: allProjects});
		})
		.catch(function(err){
			console.log('Route getAllProjects err', err);
		})
});


projectRouter.post('/project/create', function(req, res){
	projectCtrl.createProject(req.user._id, req.body.projectName)
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