(function() {
	'use strict';
	
	angular
	  .module('app')
	  .constant('apiConstant', {
	  	user: {
	  		login: '/login',
	  		logout: '/logout',
	  		registration: '/registration'
	  	},
	  	project: {
	  		getAll: '/projects/getAll',
	  		create: '/project/create'
	  	}
	  });

})();

