(function() {
	'use strict';

	angular
	  .module('login')
	  .controller('loginController', loginController);

	loginController.$inject = ['ngToast', 'loginFactory', 'factoryHelper'];

	function loginController(ngToast, loginFactory, factoryHelper) {
		var vm = this;

		vm.userName;
		vm.pass;

		vm.reg = {};
		vm.reg.userName;
		vm.reg.email;
		vm.reg.password;
		vm.reg.confirmPassword;

		vm.reg.alreadyExist;

		vm.clearWhitespace = clearWhitespace;

		vm.clearwhitespaceUsername = clearwhitespaceUsername;
		vm.clearwhitespacePass = clearwhitespacePass;

		vm.clearwhitespaceRegUsername = clearwhitespaceRegUsername;
		vm.clearWhitespaceRegEmail = clearWhitespaceRegEmail;
		vm.clearWhitespaceRegPass = clearWhitespaceRegPass;
		vm.clearWhitespaceRegConfirm = clearWhitespaceRegConfirm;

		vm.login = login;
		vm.registration = registration;
		vm.isAuthenticated = loginFactory.isAuthenticated();



		/****  Declaration  ****/

		// Replace Whitespace
        function clearWhitespace(vmData) {
            return factoryHelper.notAllowWhitespace(vmData);
        }	

        function clearwhitespaceUsername(){
        	vm.userName = clearWhitespace(vm.userName);
        }
        function clearwhitespacePass(){
        	vm.pass = clearWhitespace(vm.pass);
        }        

        function clearwhitespaceRegUsername(){
        	vm.reg.userName = clearWhitespace(vm.reg.userName);
        }
        function clearWhitespaceRegEmail(){
        	vm.reg.email = clearWhitespace(vm.reg.email);
        }	
        function clearWhitespaceRegPass(){
        	vm.reg.password = clearWhitespace(vm.reg.password);
        }	
        function clearWhitespaceRegConfirm(){
        	vm.reg.confirmPassword = clearWhitespace(vm.reg.confirmPassword);
        }	                


        
        // Registration
		function registration(username, email, password){
			loginFactory.registration(username, email, password)
				.then(function(data){
					console.log('reg data = ', data);
					if(data.usernameAlreadyExist){
						vm.reg.alreadyExist = 'This username already exist';
					} else if(data.emailAlreadyExist){
						vm.reg.alreadyExist = 'This email already exist';
					} else {
						vm.reg.alreadyExist = null;
	                    ngToast.success({
	                        content: 'You are register successfully!'
	                    });						
					}
				});
		}

		function login(username, password){
			loginFactory.login(username, password) 
				.then(function(data){
					if(data === true){
						vm.isAuthenticated = loginFactory.isAuthenticated();
	                    ngToast.success({
	                        content: 'You are logined successfully!'
	                    });
					} else {
	                    ngToast.warning({
	                        content: 'Username or password wrong'
	                    });
					}
				});
		}
	}
})();


