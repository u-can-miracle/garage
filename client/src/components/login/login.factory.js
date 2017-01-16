(function() {
	'use strict';

	angular
	  .module('login')
	  .factory('loginFactory', loginFactory);

	loginFactory.$inject = ['$http', '$q', 'apiConstant'];

	function loginFactory($http, $q, apiConstant) {
		var factory = {
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
			isAuthenticated: isAuthenticated,
			registration: registration,
			login: login,
			logout: logout
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

			$http.post(apiConstant.user.registration, regUser)
				.then(function(response){
					defer.resolve(response.data);
				});

			return defer.promise;
		}

		function login(username, password){
			var loginUser = {username: username, password: password};
			var defer = $q.defer();
			
			$http.post(apiConstant.user.login, loginUser)
				.then(function(response){		
					defer.resolve(response.data);
				});

			return defer.promise;
		}

		function logout(){
			var defer = $q.defer();

			$http.post(apiConstant.user.logout)
				.then(function(resp){
					defer.resolve(resp)
				});

			return defer.promise;
		}
	}
})();


