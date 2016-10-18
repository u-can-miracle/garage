(function() {
	'use strict';

	angular
	  .module('login')
	  .factory('loginService', loginService);

	loginService.$inject = ['$http', 'ngToast', '$q'];

	function loginService($http, ngToast, $q) {
		var factory = {
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
			isAuthenticated: isAuthenticated,
			authentification: authentification
		};
		
		return factory;

		var currentUser = undefined;

		function isAuthenticated(){
			return !!currentUser;
		}

		function setCurrentUser(user){
			currentUser = user;
		}

		function getCurrentUser(){
			return currentUser;
		}	

		function authentification(username, password){
			var loginUser = {username: username, password: password};
			var defer = $q.defer();
			$http.post('/login', loginUser)
				.then(function(response){
					if(response.data.success === true){
						factory.setCurrentUser(response.data.user);
						defer.resolve(true);
					} else {
						defer.resolve(false);
					}					
				});

			return defer.promise;
		}
	}
})();


