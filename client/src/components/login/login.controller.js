(function() {
	'use strict';

	angular
	  .module('login')
	  .controller('loginController', loginController);

	loginController.$inject = ['$http', 'ngToast', 'loginService'];

	function loginController($http, ngToast, loginService) {
		var vm = this;
		vm.signin = signin;
		vm.isAuthenticated = loginService.isAuthenticated();



		/****  Declaration  ****/
		function signin(username, password){
			loginService.authentification(username, password) 
				.then(function(data){
					if(data === true){
						vm.isAuthenticated = loginService.isAuthenticated();
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


