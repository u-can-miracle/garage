var taskModel = require('../model/task.js');
var projectModel = require('../model/project.js');
var mongoose = require('mongoose');
var q = require('q');
var entityCtrl = require('./entity.js');


module.exports = {
    createTask: createTask,
    deleteTask: deleteTask
};


function createTask(taskName, projId) {
    var task = {
        name: taskName
    };

    return taskModel.create(task, function(err, task) {
        if (err) {
            q.when(err);
        }

        var upd = {
            id: projId,
            $push: {
                tasks: task._id
            }
        };
        return entityCtrl.updateEntity('project', upd);
    });
}


function deleteTask(taskId, projId) {
    return taskModel.find({
        _id: taskId
    }).remove().exec(function(err, task) {
        if (err) {
            q.when(err);
        }

        var upd = {
            id: projId,
            $pull: {
                tasks: mongoose.Types.ObjectId(taskId)
            }
        };
        return entityCtrl.updateEntity('project', upd);        
    });
}