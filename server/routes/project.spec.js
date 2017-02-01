describe.only('projectRouter: ', function() {
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



    before(function() {
        chai.use(chaiHttp);
    });



    /***************  Tests  ***************/
    /**************************************/
    it('/projects/getAll should send allProjects response', function(done) {
        var request = {
            user: {
                _id: '585af0a2f111a70be8756151' // user-tuser
            }
        };
        var response = {
            json: function(projectsResult) {
                this.projectsResult = projectsResult;
                return projectsResult;
            },
            projectsResult: {allProjects: ['initialValue']}
        };

        projectRouter.getAllProjectMiddleware(request, response)
            .then(function(result) {
                expect(response.projectsResult.allProjects).to.have.length.above(0);
                done();
            });
    });


});