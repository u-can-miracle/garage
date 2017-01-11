var projectModel = require('../model/project.js');


module.exports = {
    createProject: createProject
};


function createProject(created_by, name) {
    var proj = new projectModel({
        created_by: created_by,
        name: name || ''
    });
    var promise = proj.save();

    return promise.then(function(proj) {
            proj.save();
            return proj._id;
        })
        .catch(function(err) {
            console.log('ctrl createProject err', err);
        });
}