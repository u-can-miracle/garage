describe('Test factoryHelper: ', function(){
	var factoryHelper;

	beforeEach(function(){
		module('app');

        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });
        });		
	});


	beforeEach(inject(function(_factoryHelper_) {
		factoryHelper = _factoryHelper_;
	}));


    
    /**************  TESTS  **************/
    /************************************/


	it('check factoryHelper exist', function(){
		expect(factoryHelper).toBeDefined();
	});

	it('factoryHelper.notAllowWhitespace should remove whitespaces', function(){
		var res = factoryHelper.notAllowWhitespace(' 12 3 4 ');
		expect(res).toEqual('1234');
	});
});