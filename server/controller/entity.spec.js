describe('entity controller: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');


    var entityCtrl = require('./entity.js');
    
			




    /****  Tests  ****/
    describe('updateEntity should call: ', function(){
    	/****  Prepearing  ****/
    	var getModelStub;
        var model;

    	beforeEach(function(){
    		model = {
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
    	it('getModel with expected params', function(done){
            entityCtrl.updateEntity('task', 'projName')
                .then(function(res) {
                    expect(getModelStub.callCount).to.eql(1);
                    expect(getModelStub.getCall(0).args[0]).to.eql('task');
                    done();
                });    		
    	});

    	it('model.update() and model.exec()', function(done){
            entityCtrl.updateEntity('project', 'projName')
                .then(function(res) {
                    expect(res).to.eql('data');
                    done();
                });
    	});
    });
});