var projectModel = require('../model/project.js');
var mongoose = require('mongoose');
var q = require('q');


module.exports = {
    getAllProjects: getAllProjects,
    createProject: createProject,
    updateProject: updateProject,
    deleteProject: deleteProject
};


function getAllProjects(userId) {
    return projectModel.find({
        created_by: userId
    });
}

function createProject(created_by, projectName) {
    var defer = q.defer();
    var project = new projectModel({
        created_by: created_by,
        name: projectName
    });

    project.save(function(err, proj) {
        if (err) {
            defer.reject(err)
        }
        defer.resolve(proj);
    });

    return defer.promise;
}

function updateProject(id, newName) {
    return projectModel.update({
            _id: id
        }, {
            name: newName,
            updated_at: new Date()
        })
        .exec();
}

function deleteProject(id) {
    return projectModel.find({
        _id: id
    }).remove().exec();
}