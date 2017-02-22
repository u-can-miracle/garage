var express = require('express');
var taskRouter = express.Router();
var loginCtrl = require('../controller/login.js');
var taskCtrl = require('../controller/task.js');
var entityCtrl = require('../controller/entity.js');
var q = require('q');

module.exports = {
	taskRouter: taskRouter,

	/****  For testing  ****/
	createTaskMiddleware: createTaskMiddleware,
	updateTaskMiddleware: updateTaskMiddleware,
	deleteTaskMiddleware: deleteTaskMiddleware
};

taskRouter.post('/task/create', loginCtrl.ensureAuthenticated, createTaskMiddleware);

taskRouter.put('/task/update', loginCtrl.ensureAuthenticated, updateTaskMiddleware);

taskRouter.delete('/task/delete/:taskId/:projId', loginCtrl.ensureAuthenticated, deleteTaskMiddleware);

function createTaskMiddleware(req, res){
	return taskCtrl.createTask(req.body.taskName, req.body.projId)
		.then(function(task){
			res.json({task: task});
		})
		.catch(function(err){
			console.log('/task/create err: ', err);
			res.json({err: err});
		});
}

function updateTaskMiddleware(req, res){
	return entityCtrl.updateEntity('task', req.body)
		.then(function(task){
			res.json({task: task});
		})
		.catch(function(err){
			console.log('/task/update err: ', err);
			res.json({err: err});
		});
}

function deleteTaskMiddleware(req, res){
	return taskCtrl.deleteTask(req.params.taskId, req.params.projId)
		.then(function(modifiedDocs){
			var isDeleted = false;
			if(modifiedDocs){
				isDeleted = true;
			}
			res.json({isDeleted: isDeleted});
		})
		.catch(function(err){  // save err to DB
			console.log('/task/delete err: ', err);
			res.json({err: err});
		});
}

