var projectModel = require('../model/project.js');
var taskModel = require('../model/task.js');
var mongoose = require('mongoose');
var q = require('q');
var _ = require('lodash');

module.exports = {
    updateEntity: updateEntity,

    /****  For testing  ****/
    getModel: getModel
};

function updateEntity(entityType, updateData) {
    var id = updateData.id;
    var upd = _.omit(updateData, 'id');
    var model = module.exports.getModel(entityType); // for testing

    upd.updated_at = new Date();

    return model.update({
            _id: mongoose.Types.ObjectId(id)
        }, upd)
        .exec();
}


function getModel(entityType) {
    var availableModels = {
        task: taskModel,
        project: projectModel
    };
    return availableModels[entityType];
}