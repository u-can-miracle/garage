describe('project controller: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');


    var mongoose = require('mongoose');
    var monkeypatch = require('monkeypatch');


    var taskCtrl = require('./task.js');
    var taskModel = require('../model/task.js');
    var projectModel = require('../model/project.js');







    /****  Tests  ****/
    describe('createTask should call: ', function() {
        /****  Prepearing  ****/
        var modelCreateStub;

        beforeEach(function() {
            modelCreateStub = sinon.stub(taskModel, 'create').returns(q.when('resultyty'));
        });

        afterEach(function() {
            modelCreateStub.restore();
        });



        /****  Execution  ****/
        it('taskModel.create', function(done) {
            taskCtrl.createTask('taskName', 'projId')
                .then(function(res) {
                    expect(modelCreateStub.callCount).to.eql(1);
                    done();
                });
        });

        it('taskModel.create with right params', function(done) {
            taskCtrl.createTask('taskName', 'projId')
                .then(function(res) {
                    expect(modelCreateStub.getCall(0).args[0]).to.eql({
                        name: 'taskName'
                    });
                    done();
                });
        });       
    });



    describe('deleteTask should call: ', function() {
        /****  Prepearing  ****/
        var modelFindStub;

        beforeEach(function() {
            var findResult = {
                remove: function(){
                    return this;
                },
                exec: function(){
                    return q.when('result');
                }
            };
            modelFindStub = sinon.stub(taskModel, 'find').returns(findResult);
        });

        afterEach(function() {
            modelFindStub.restore();
        });



        /****  Execution  ****/
        it('taskModel.find', function(done) {
            taskCtrl.deleteTask('taskId', 'projId')
                .then(function(res) {
                    expect(modelFindStub.callCount).to.eql(1);
                    done();
                });
        });

        it('taskModel.create with right params', function(done) {
            taskCtrl.deleteTask('taskId', 'projId')
                .then(function(res) {
                    expect(modelFindStub.getCall(0).args[0]).to.eql({
                        _id: 'taskId'
                    });
                    done();
                });
        });  
    });
});