describe('projectRouter: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');



    var app = require('../../server.js');
    var loginCtrl = require('../controller/login.js');
    var projectCtrl = require('../controller/project.js');
    var entityCtrl = require('../controller/entity.js');

    var projectRouter = require('./project.js');


    var request = {};
    var response = {
        json: function() {}
    };



    /***************  Tests  ***************/
    /**************************************/



    it('createProjectMiddleware() should call projectCtrl.createProject', function(done) {
        var createProjectStub = sinon.stub(projectCtrl, 'createProject').returns(q.when('data'));

        request = {
            body: {
                projectName: 'projName'
            },
            user: {
                _id: 'userId'
            }
        };

        projectRouter.createProjectMiddleware(request, response)
            .then(function(proj) {
                expect(createProjectStub.callCount).to.eql(1);
                expect(createProjectStub.getCall(0).args[0]).to.eql('userId');
                expect(createProjectStub.getCall(0).args[1]).to.eql('projName');
                done();
            });
    });



    it('updateProjMiddleware() should call entityCtrl.updateEntity()', function(done) {
        var updateEntityStub = sinon.stub(entityCtrl, 'updateEntity').returns(q.when('data'));

        var updatedProjName = 'test_updatedProjectName';
        request.body = {
            projName: updatedProjName,
            id: 'projId'
        };
        projectRouter.updateProjMiddleware(request, response)
            .then(function(res) {
                expect(updateEntityStub.callCount).to.eql(1);
                expect(updateEntityStub.getCall(0).args[0]).to.eql('project');
                expect(updateEntityStub.getCall(0).args[1]).to.eql({
                    projName: 'test_updatedProjectName',
                    id: 'projId'
                });
                updateEntityStub.restore();
                done();
            });
    });



    it('getAllProjectMiddleware() should call projectCtrl.getAllProjects()', function(done) {
        var getAllProjectsStub = sinon.stub(projectCtrl, 'getAllProjects').returns(q.when('data'));
        request = {
            user: {
                _id: 'userId'
            }
        };

        projectRouter.getAllProjectMiddleware(request, response)
            .then(function(result) {
                expect(getAllProjectsStub.callCount).to.eql(1);
                expect(getAllProjectsStub.getCall(0).args[0]).to.eql('userId');
                done();
            });
    });



    it('deleteProjMiddleware() should call projectCtrl.deleteProject()', function(done) {
        var deleteProjectStub = sinon.stub(projectCtrl, 'deleteProject').returns(q.when('data'));
        request.params = {
            projId: 'projId'
        };
        projectRouter.deleteProjMiddleware(request, response)
            .then(function() {
                expect(deleteProjectStub.callCount).to.eql(1);
                expect(deleteProjectStub.getCall(0).args[0]).to.eql('projId');
                done();
            })
    });
});