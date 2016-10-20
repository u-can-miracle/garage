(function() {
	'use strict';

	angular
	  .module('login')
	  .factory('loginFactory', loginFactory);

	loginFactory.$inject = ['$http', 'ngToast', '$q'];

	function loginFactory($http, ngToast, $q) {
		var factory = {
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
			isAuthenticated: isAuthenticated,
			registration: registration,
			login: login
		};
		
		return factory;


		/***  Declaration  ***/

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

		function registration(username, email, password){
			var regUser = {
				username: username,
				email: email,
				password: password
			};
			var defer = $q.defer();

			console.log('regUser', regUser);

			$http.post('/registration', regUser)
				.then(function(response){
					defer.resolve(response.data);
				});

			return defer.promise;	
		}

		function login(username, password){
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


