describe('entity controller: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');

	
	var mongoose = require('mongoose');


    var entityCtrl = require('./entity.js');
    // var projectModel = require('../model/project.js');
    
			





    /****  Tests  ****/
    describe.only('updateEntity should call: ', function(){
    	/****  Prepearing  ****/
    	var getModelStub;

    	beforeEach(function(){
    		var model = {
                update: function(){
                    return this;
                },
    			exec: function(){
    				return q.when('data');
    			}
    		};
    		getModelStub = sinon.stub(entityCtrl, 'getModel').returns(model);
    	});

    	afterEach(function(){
    		getModelStub.restore();
    	});



    	/****  Execution  ****/
    	it.only('projectModel.update', function(done){
            // console.log('test', Object.keys(entityCtrl.getModel));
            entityCtrl.updateEntity('task', 'projName')
                .then(function(res) {
                    console.log('test', String(entityCtrl.getModel));
                    // console.log(getModelStub.callCount);
                    // expect(getModelStub.callCount).to.eql(1);
                    done();
                });    		
    	});

    	it('projectModel.update with expected params', function(done){
            projectCtrl.updateProject('idString', 'projName')
                .then(function(res) {
                    expect(getModelStub.getCall(0).args[0]).to.eql({
                    	_id: 'idString'
                    });
                    expect(getModelStub.getCall(0).args[1].name).to.eql('projName');
                    done();
                });
    	});
    });
});