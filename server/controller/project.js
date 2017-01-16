var projectModel = require('../model/project.js');


module.exports = {
    getAllProjects: getAllProjects,
    createProject: createProject
};


function getAllProjects(userId){
    return projectModel.find({created_by: userId});
}

function createProject(created_by, projectName) {
    var proj = new projectModel({
        created_by: created_by,
        name: projectName
    });
    var promise = proj.save();

    return promise.then(function(proj) {
            proj.save();

            var newProject = {
                _id: proj._id,
                name: proj.name,
                created_at: proj.created_at 
            };

            return newProject;
        })
        .catch(function(err) {
            console.log('ctrl createProject err', err);
        });
}

