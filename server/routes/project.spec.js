describe('projectRouter: ', function() {
    var q = require('q');
    var chai = require('chai');
    var chaiHttp = require('chai-http');
    var expect = chai.expect;
    var sinon = require('sinon');
    var monkeypatch = require('monkeypatch');




    var app = require('../../server.js');
    var loginCtrl = require('../controller/login.js');
    var projectCtrl = require('../controller/project.js');

    var projectRouter = require('./project.js');


    var request;
    var response;


    before(function() {
        chai.use(chaiHttp);
        request = {
            user: {
                _id: '585af0a2f111a70be8756151' // user-tuser
            }
        };
        response = {
            json: function(param) {
                this.result = param;
                return param;
            },
            result: {},
            projId: '',
            projName: ''
        };        
    });



    /***************  Tests  ***************/
    /**************************************/



    it('createProjectMiddleware() should create project', function(done){
        var projName = 'test_projectName' + Date.now();
        request.body = {
            projectName: projName
        };
        projectRouter.createProjectMiddleware(request, response)
            .then(function(res){
                expect(response.result.proj.name).to.eql(projName);
                response.projId = response.result.proj._id;
                done();
            });
    });



    it('updateProjMiddleware() should update project name', function(done){
        var updatedProjName = 'test_updatedProjectName' + Date.now();
        request.body = {
            projName: updatedProjName,
            projId: response.projId
        };
        projectRouter.updateProjMiddleware(request, response)
            .then(function(res){
                expect(response.result.proj.nModified).to.eql(1);
                done();
            });
    });    


    
    it('getAllProjectMiddleware() should send allProjects response', function(done) {
        projectRouter.getAllProjectMiddleware(request, response)
            .then(function(result) {
                expect(response.result.allProjects).to.have.length.above(0);
                done();
            });
    });



    it('deleteProjMiddleware() should delete project', function(done){
        request.params = {
            projId: response.projId
        };
        projectRouter.deleteProjMiddleware(request, response)
            .then(function(){
                expect(response.result.proj.result.ok).to.eql(1);
                expect(response.result.proj.result.n).to.eql(1);
                done();
            })
    });
});