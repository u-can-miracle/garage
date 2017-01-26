describe('project controller testing: ', function() {
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


    describe('createProject should: ', function() {
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

        it('call projectModel.create', function(done) {
            projectCtrl.createProject(idString, 'projName')
                .then(function(res) {
                    expect(modelCreateStub.callCount).to.eql(1);
                    done();
                });
        });

        it('call projectModel.create with right params', function(done) {
            projectCtrl.createProject(idString, 'projName')
                .then(function(res) {
                	console.log('modelCreateStub.getCall(0).args[0]', modelCreateStub.getCall(0).args[0]);
                    expect(modelCreateStub.getCall(0).args[0]).to.eql({
                    	created_by: idString,
                    	name: 'projName'
                    });
                    done();
                });
        });        
    });
});