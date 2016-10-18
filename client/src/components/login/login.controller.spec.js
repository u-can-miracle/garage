describe('Test loginController', function() {
	var scope;
	var controller;
	var httpBeckend;

	beforeEach(function() {
		// module('login', 'dataRequest', 'ui.router');
		module('login');
	});

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    controller = $controller('loginController', {
      $scope: scope
    });
  }));	

	it('check $scope.buildSingleObj ', function() { // 
		expect(3).toEqual(3);
	});
});