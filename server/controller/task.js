var taskModel = require('../model/task.js');
var projectModel = require('../model/project.js');
var mongoose = require('mongoose');
var q = require('q');


module.exports = {
    createTask: createTask,
    deleteTask: deleteTask
};


function createTask(taskName, projId) {
    var defer = q.defer();
    var task = {
        name: taskName
    };

    return taskModel.create(task, function(err, task) {
        if(err){
            defer.reject(err);
            return defer.promise;
        }

        return projectModel.update({
            _id: mongoose.Types.ObjectId(projId)
        }, {
            $push: {
                tasks: task._id
            }
        }, function(err, result){
            if(err){
                console.log('err', err);
                defer.reject(err);
            } else {
                console.log('result', result);
                defer.resolve(result.nModified);
            }
            return defer.promise;
        });
    });
}


function deleteTask(taskId, projId) {
    var defer = q.defer();

    taskModel.find({
        _id: mongoose.Types.ObjectId(taskId)
    }).remove().exec(function(err, result){
        if(err){
            defer.reject(err);            
        }

     projectModel.update({
            _id: mongoose.Types.ObjectId(projId)
        }, {
            $pull: {
                'tasks': mongoose.Types.ObjectId(taskId)
            }
        }, function(err, result){
            if(err){
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        }); 
    });

    return defer.promise; 
}
