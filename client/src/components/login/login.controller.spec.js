describe('Test loginController: ', function() {
    var rootScope;
    var controller;
    var httpBeckend;
    var $q;
    var deferred;
    var logFactory;

    var vm;

    var mockFactoryHelper, mockState, mockToast;

    function checkIsObjMethodCall(obj, objMethod, fnTrigger) {
        var stub = sinon.stub(obj, objMethod);
        fnTrigger();
        expect(stub.callCount).toEqual(1);
        stub.restore();
    }

    beforeEach(function() {
        module('login', 'ngToast', 'ui.router');

        module(function($provide) {
            $provide.factory('factoryHelper', function() {
                return {
                    notAllowWhitespace: function() {}
                };
            });
            $provide.factory('loginFactory', function() {
                return {
                    registration: sinon.stub(),
                    login: sinon.stub()
                };
            });
            $provide.service('ngToast', function() {
            	this.success = sinon.stub();
            	this.warning = sinon.stub();
            });
            $provide.service('$state', function() {
                this.go = sinon.stub();
            });
        });
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _factoryHelper_, _$state_,
    							_ngToast_, _$q_, $injector, _loginFactory_) {
        rootScope = _$rootScope_;
        $controller = _$controller_;
        controller = $controller('loginController', {

        });
        $q = _$q_;
        deferred = $q.defer();

		vm = controller;  

        logFactory = _loginFactory_;

        mockFactoryHelper = _factoryHelper_;
        mockState = _$state_;
        mockToast = _ngToast_;
    }));



    /**************  TESTS  **************/
    /************************************/


    it('loginController.clearWhitespace should call factoryHelper.notAllowWhitespace ', function() { // 
        checkIsObjMethodCall(mockFactoryHelper, 'notAllowWhitespace', vm.clearWhitespace);
    });


    it('All login fields should call vm.clearWhitespace via input new value', function() {
        checkIsObjMethodCall(vm, 'clearWhitespace', vm.clearwhitespaceUsername);
        checkIsObjMethodCall(vm, 'clearWhitespace', vm.clearwhitespacePass);
        checkIsObjMethodCall(vm, 'clearWhitespace', vm.clearwhitespaceRegUsername);
        checkIsObjMethodCall(vm, 'clearWhitespace', vm.clearWhitespaceRegEmail);
        checkIsObjMethodCall(vm, 'clearWhitespace', vm.clearWhitespaceRegPass);
        checkIsObjMethodCall(vm, 'clearWhitespace', vm.clearWhitespaceRegConfirm);
    });


    describe('Registration: ', function(){
	    it('new user should returns success ', function() {
	        var regResponse = { successRegistered: true };
	        vm.reg.alreadyExist = 123;
	        logFactory.registration.returns(deferred.promise);


	    	expect(logFactory.registration.callCount).toEqual(0);
	    	expect(mockToast.success.callCount).toEqual(0);
	    	expect(vm.reg.alreadyExist).toEqual(123);


	        vm.registration();
	        deferred.resolve(regResponse);
			rootScope.$digest();


	    	expect(logFactory.registration.callCount).toEqual(1);
	    	expect(mockToast.success.callCount).toEqual(1);
	    	expect(vm.reg.alreadyExist).toEqual(null);
	    });


	    it('existing user should returns warning ', function() {
	        var regResponse = {
	            successRegistered: false,
	            message: 'User already exist'
	        };
	        logFactory.registration.returns(deferred.promise);
	        vm.reg.alreadyExist = null;


	    	expect(logFactory.registration.callCount).toEqual(0);
	    	expect(mockToast.warning.callCount).toEqual(0);
	    	expect(vm.reg.alreadyExist).toEqual(null);


	        vm.registration();
	        deferred.resolve(regResponse);
	        rootScope.$digest();


	    	expect(logFactory.registration.callCount).toEqual(1);
	    	expect(mockToast.warning.callCount).toEqual(1);
	        expect(vm.reg.alreadyExist).toEqual('User already exist');
	    }); 
    })


    describe('Login: ', function(){
	    it('logFactory.registration(a, b, c) should calls with vm.registration(a, b, c) params', function(){
	    	logFactory.registration.returns(deferred.promise);


			expect(logFactory.registration.callCount).toEqual(0);


	    	vm.registration('name', 'email', 'password');
	    	deferred.resolve({});
	    	rootScope.$digest();


	    	expect(logFactory.registration.callCount).toEqual(1);
	    	expect(logFactory.registration.calledWith('name', 'email', 'password')).toBe(true);
	    }); 


	    it('success - login should confirm with success and redirect to $state.go("main.todo")', function(){
	    	vm.loginError = 'Warning text';
	    	logFactory.login.returns(deferred.promise);


	    	expect(mockToast.success.callCount).toEqual(0);
	    	expect(mockState.go.callCount).toEqual(0);
	    	expect(vm.loginError).toEqual('Warning text');


	    	vm.login();
	    	deferred.resolve({loginSuccess: true});
	    	rootScope.$digest();


	    	expect(mockToast.success.callCount).toEqual(1);
	    	expect(mockState.go.callCount).toEqual(1);
	    	expect(mockState.go.calledWith('main.todo')).toEqual(true);
	    	expect(vm.loginError).toEqual('');
	    });    


	    it('warning - login should show notification', function(){
	    	var serverResponse = {
	    		loginSuccess: false,
	    		message: 'Wrong data'
	    	};
	    	vm.loginError = 'text';
	    	logFactory.login.returns(deferred.promise);


			expect(vm.loginError).toEqual('text');
			expect(mockToast.warning.callCount).toEqual(0);


	    	vm.login();
	    	deferred.resolve(serverResponse);
	    	rootScope.$digest();


	    	expect(vm.loginError).toEqual('Wrong data');
	    	expect(mockToast.warning.callCount).toEqual(1);
	    });
    });
});