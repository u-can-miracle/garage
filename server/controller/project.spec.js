describe('project controller: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');


    var mongoose = require('mongoose');
    var monkeypatch = require('monkeypatch');


    var projectCtrl = require('./project.js');
    var projectModel = require('../model/project.js');







    /****  Tests  ****/
    describe('getAllProjects should call ', function() {
        /****  Prepearing  ****/
        var projtModStub;
        var userId;

        var findModel = {
            populate: function() {
                return this;
            },
            remove: function() {
                return this;
            },
            exec: function() {
                return q.when('data');
            }
        };
        projtModStub = sinon.stub(projectModel, 'find').returns(findModel);

        beforeEach(function() {
            userId = 'userId';
        });

        afterEach(function() {
            projtModStub.restore();
        });



        /****  Execution  ****/
        it('find() method with expected params', function(done) {
            projectCtrl.getAllProjects(userId)
                .then(function() {
                    expect(projtModStub.callCount).to.eql(1);
                    expect(projtModStub.getCall(0).args[0]).to.eql({
                        created_by: 'userId'
                    });                    
                    done();
                });
        });
    });



    describe('createProject should call: ', function() {
        /****  Prepearing  ****/
        var modelCreateStub;
        var idString;

        beforeEach(function() {
            modelCreateStub = sinon.stub(projectModel, 'create').returns(q.when('resultyty'));
            idString = mongoose.Types.ObjectId().toString();
        });

        afterEach(function() {
            modelCreateStub.restore();
        });



        /****  Execution  ****/
        it('projectModel.create', function(done) {
            projectCtrl.createProject(idString, 'projName')
                .then(function(res) {
                    expect(modelCreateStub.callCount).to.eql(1);
                    done();
                });
        });

        it('projectModel.create with right params', function(done) {
            projectCtrl.createProject(idString, 'projName')
                .then(function(res) {
                    expect(modelCreateStub.getCall(0).args[0]).to.eql({
                        created_by: idString,
                        name: 'projName'
                    });
                    done();
                });
        });
    });



    describe('deleteProject should call: ', function() {
        /****  Prepearing  ****/
        var modelDeleteStub;

        beforeEach(function() {
            var execObj = {
                remove: function() {
                    return {
                        exec: function() {
                            return q.when('findResult');
                        }
                    };
                }
            };
            modelDeleteStub = sinon.stub(projectModel, 'find').returns(execObj);
        });

        afterEach(function() {
            modelDeleteStub.restore();
        });



        /****  Execution  ****/
        it('projectModel.find', function(done) {
            projectCtrl.deleteProject('projectId')
                .then(function(res) {
                    expect(res).to.eql('findResult');
                    expect(modelDeleteStub.callCount).to.eql(1);
                    done();
                });
        });

        it('projectModel.find with expected params', function(done) {
            projectCtrl.deleteProject('projectId')
                .then(function(res) {
                    expect(modelDeleteStub.getCall(0).args[0]).to.eql({
                        _id: 'projectId'
                    });
                    done();
                });
        });
    });
});