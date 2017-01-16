(function() {
	'use strict';

	angular
	  .module('project')
	  .service('projectService', projectService);

	projectService.$inject = ['$http', '$q', 'apiConstant'];

	function projectService($http, $q, apiConstant) {
		this.createProject = createProject;
		this.getAllProjects = getAllProjects;
		this.projectUpdate = projectUpdate;


		/***  Declaration  ***/

		function getAllProjects(){
			var defer = $q.defer();

			$http.get(apiConstant.project.getAll)
				.then(function(allProjects){
					defer.resolve(allProjects);
				})
				.catch(function(err){
					defer.resolve(err);
				});

			return defer.promise;
		}

		function createProject(projectName){
			var defer = $q.defer();

			$http.post(apiConstant.project.create, {projectName: projectName})
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.resolve(err);
				});

			return defer.promise;
		}


		function projectUpdate(name){
			console.log(name);
		}
	}
})();