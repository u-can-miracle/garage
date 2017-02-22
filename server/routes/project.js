var express = require('express');
var projectRouter = express.Router();
var loginCtrl = require('../controller/login.js');
var projectCtrl = require('../controller/project.js');
var entityCtrl = require('../controller/entity.js');
var q = require('q');

module.exports = {
	projectRouter: projectRouter,

	/****  For testing  ****/
	getAllProjectMiddleware: getAllProjectMiddleware,
	createProjectMiddleware: createProjectMiddleware,
	updateProjMiddleware: updateProjMiddleware,
	deleteProjMiddleware: deleteProjMiddleware
};

projectRouter.get('/project', loginCtrl.ensureAuthenticated, function(req, res){
	res.render('index');
});


projectRouter.get('/projects/getAll', loginCtrl.ensureAuthenticated, getAllProjectMiddleware);


projectRouter.post('/project/create', createProjectMiddleware);


projectRouter.put('/project/update', updateProjMiddleware);


projectRouter.delete('/project/delete/:projId', deleteProjMiddleware);





function getAllProjectMiddleware(req, res){
	return projectCtrl.getAllProjects(req.user._id)
		.then(function(allProjects){
			res.json({allProjects: allProjects});
			return allProjects;
		})
		.catch(function(err){
			console.log('Route getAllProjects err', err);
			return err;
		});
}

function createProjectMiddleware(req, res){
	return projectCtrl.createProject(req.user._id, req.body.projectName)
		.then(function(proj){
			res.json({proj: proj});
			return proj;
		})
		.catch(function(err){
			res.json({err: err});
			return err;
		});
}

function updateProjMiddleware(req, res){
	return entityCtrl.updateEntity('project', req.body)
		.then(function(proj){
			res.json({proj: proj});
			return proj;
		})
		.catch(function(err){
			res.json({err: err});
			return err;
		});
}

function deleteProjMiddleware(req, res){
	return projectCtrl.deleteProject(req.params.projId)
		.then(function(result){
			var isRemoved = false;
			if(result.result.ok == 1){
				isRemoved = true;
			}
			res.json({isRemoved: isRemoved});
			return result;
		})
		.catch(function(err){
			res.json({err: err});
			return err;
		});
}