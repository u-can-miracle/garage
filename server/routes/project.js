var express = require('express');
var projectRouter = express.Router();
var loginCtrl = require('../controller/login.js');
var projectCtrl = require('../controller/project.js');
var q = require('q');

module.exports = {
	projectRouter: projectRouter,
	getAllProjectMiddleware: getAllProjectMiddleware
};

projectRouter.get('/project', loginCtrl.ensureAuthenticated, function(req, res){
	res.render('index');
});


projectRouter.get('/projects/getAll', loginCtrl.ensureAuthenticated, getAllProjectMiddleware);


projectRouter.post('/project/create', function(req, res){
	projectCtrl.createProject(req.user._id, req.body.projectName)
		.then(function(proj){
			console.log('rout proj', proj);
			res.json({proj: proj});
		})
		.catch(function(){
			res.json({err: err});
		});
});


projectRouter.put('/project/update', function(req, res){
	projectCtrl.updateProject(req.body.projId, req.body.projName)
		.then(function(proj){
			res.json({proj: proj});
		})
		.catch(function(err){
			res.json({err: err});
		});
});


projectRouter.delete('/project/delete/:projId', function(req, res){
	projectCtrl.deleteProject(req.params.projId)
		.then(function(proj){
			res.json({proj: proj});
		})
		.catch(function(err){
			res.json({err: err});
		});
});

function getAllProjectMiddleware(req, res){
	return projectCtrl.getAllProjects(req.user._id)
		.then(function(allProjects){
			res.json({allProjects: allProjects});
		})
		.catch(function(err){
			console.log('Route getAllProjects err', err);
		});
}