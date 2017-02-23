(function() {
	'use strict';

	angular
	  .module('login')
	  .controller('loginController', loginController);

	loginController.$inject = ['ngToast', 'loginFactory', 'factoryHelper', '$state'];

	function loginController(ngToast, loginFactory, factoryHelper, $state) {
		var vm = this;


		vm.userName;
		vm.pass;
		vm.loginError;

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



		/****  Declaration  ****/

		// Replace Whitespace
        function clearWhitespace(vmData) {
            return factoryHelper.notAllowWhitespace(vmData);
        }	

        function clearwhitespaceUsername(){
        	vm.userName = vm.clearWhitespace(vm.userName);
        }
        function clearwhitespacePass(){
        	vm.pass = vm.clearWhitespace(vm.pass);
        }        

        function clearwhitespaceRegUsername(){
        	vm.reg.userName = vm.clearWhitespace(vm.reg.userName);
        }
        function clearWhitespaceRegEmail(){
        	vm.reg.email = vm.clearWhitespace(vm.reg.email);
        }	
        function clearWhitespaceRegPass(){
        	vm.reg.password = vm.clearWhitespace(vm.reg.password);
        }	
        function clearWhitespaceRegConfirm(){
        	vm.reg.confirmPassword = vm.clearWhitespace(vm.reg.confirmPassword);
        }	                


        
        // Registration
		function registration(username, email, password){
			return loginFactory.registration(username, email, password)
				.then(function(data){
					if(data.successRegistered === true){
						vm.reg.alreadyExist = null;
	                    return ngToast.success({
	                        content: 'You are register successfully! Visit your email and confirm registration.'
	                    });	
					} else {
						vm.reg.alreadyExist = data.message;
	                    return ngToast.warning({
	                        content: vm.reg.alreadyExist
	                    });						
					}
				});
		}

		function login(username, password){
			return loginFactory.login(username, password) 
				.then(function(data){
					if(data.loginSuccess === true){
						$state.go('main.project');
	                    return ngToast.success({
	                        content: data.message
	                    });
					} else {
	                    return ngToast.warning({
	                        content: data.message
	                    });
					}
				});
		}
	}
})();


