describe('project controller: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');
    var mockery = require('mockery');

	
	var mongoose = require('mongoose');


    var projectCtrl = require('./project.js');
    var projectModel = require('../model/project.js');
    
			





    /****  Tests  ****/
    describe('getAllProjects should call ', function() {
    	/****  Prepearing  ****/
        var projtModStub;
        var userId;

        beforeEach(function() {
            projtModStub = sinon.stub(projectModel, 'find').returns(q.when('result'));
            userId = 'userId';
        });

        afterEach(function() {
            projtModStub.restore();
        });



        /****  Execution  ****/
        it('find() method', function(done) {
            projectCtrl.getAllProjects(userId)
                .then(function() {
                    expect(projtModStub.callCount).to.eql(1);
                    done();
                });
        });

        it('expected params', function(done) {
            projectCtrl.getAllProjects(userId)
                .then(function() {
                    expect(projtModStub.getCall(0).args[0]).to.eql({
                        created_by: userId
                    });
                    done();
                });
        });
    });



    describe('createProject should call: ', function() {
    	/****  Prepearing  ****/
    	var modelCreateStub;
    	var idString;

    	beforeEach(function(){
        	modelCreateStub = sinon.stub(projectModel, 'create').returns(q.when('resultyty'));
			idString = mongoose.Types.ObjectId().toString();
    	});

    	afterEach(function(){
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



    describe('updateProject should call: ', function(){
    	/****  Prepearing  ****/
    	var modelUpdateStub;

    	beforeEach(function(){
    		var execObj = {
    			exec: function(){
    				return q.when('data');
    			}
    		};
    		modelUpdateStub = sinon.stub(projectModel, 'update').returns(execObj);
    	});

    	afterEach(function(){
    		modelUpdateStub.restore();
    	});



    	/****  Execution  ****/
    	it('projectModel.update', function(done){
            projectCtrl.updateProject('idString', 'projName')
                .then(function(res) {
                    expect(modelUpdateStub.callCount).to.eql(1);
                    done();
                });    		
    	});

    	it('projectModel.update with expected params', function(done){
            projectCtrl.updateProject('idString', 'projName')
                .then(function(res) {
                    expect(modelUpdateStub.getCall(0).args[0]).to.eql({
                    	_id: 'idString'
                    });
                    expect(modelUpdateStub.getCall(0).args[1].name).to.eql('projName');
                    done();
                });
    	});
    });



    describe('deleteProject should call: ', function(){
    	/****  Prepearing  ****/
    	var modelDeleteStub;

    	beforeEach(function(){
            var execObj = {
                remove: function() {
                    return {
                        exec: function() {
                            return q.when('result');
                        }
                    };
                }
            };
    		modelDeleteStub = sinon.stub(projectModel, 'find').returns(execObj);
    	});

    	afterEach(function(){
    		modelDeleteStub.restore();
    	});



    	/****  Execution  ****/
    	it('projectModel.find', function(done){
            projectCtrl.deleteProject('projectId')
                .then(function(res) {
                    expect(modelDeleteStub.callCount).to.eql(1);
                    done();
                }); 
    	});

    	it('projectModel.find with expected params', function(done){
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