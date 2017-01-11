(function() {
	'use strict';

	angular
	  .module('project')
	  .service('projectService', projectService);

	projectService.$inject = ['$http'];

	function projectService($http) {
		this.createProject = createProject;
		this.projectUpdate = projectUpdate;


		/***  Declaration  ***/

		function createProject(projectArray){
	        var newProject = {
	            projectName: '',
	            tasks: []
	        };

			return $http.post('/projects/create', newProject)
				.then(function(resp){
	           		projectArray.unshift(newProject);
					console.log('projectService resp', resp);
				})
				.catch(function(err){
					console.log('projectService err', err);
				});
		}


		function projectUpdate(name){
			console.log(name);
		}
	}
})();