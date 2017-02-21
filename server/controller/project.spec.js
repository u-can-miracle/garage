describe.only('project controller: ', function() {
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

        var modelFind = {
            populate: function(){
                return this;
            },
            exec: function(){
                return q.when('data');
            }
        };
        monkeypatch(projectModel, 'find', function(arg) { console.log('arg', arguments); return modelFind; });
        // projtModStub = sinon.stub(projectModel, 'find');

        beforeEach(function() {
            userId = 'userId';
        });

        afterEach(function() {
            // projtModStub.restore();
        });



        /****  Execution  ****/
        it.only('find() method', function(done) {
            projectModel.find('123')
            // projectCtrl.getAllProjects(userId)
            //     .then(function() {
                    
            //         expect(projtModStub.callCount).to.eql(1);
                    done();
                // });
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