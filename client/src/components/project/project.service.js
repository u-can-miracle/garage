(function() {
	'use strict';

	angular
	  .module('project')
	  .service('projectService', projectService);

	projectService.$inject = ['$http', '$q', 'apiConstant'];

	function projectService($http, $q, apiConstant) {
		this.projectCreate = projectCreate;
		this.getAllProjects = getAllProjects;
		this.projectUpdate = projectUpdate;
		this.projectDelete = projectDelete;


		/***  Declaration  ***/

		function getAllProjects(){
			var defer = $q.defer();

			$http.get(apiConstant.project.getAll)
				.then(function(allProjects){
					defer.resolve(allProjects);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}

		function projectCreate(projectName){
			var defer = $q.defer();

			$http.post(apiConstant.project.create, {projectName: projectName})
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}


		function projectUpdate(projId, projName){
			var updatedData = {projId: projId, projName: projName};
			var defer = $q.defer();

			$http.put(apiConstant.project.update, updatedData)
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}

		function projectDelete(projId){
			var defer = $q.defer();

			console.log('del projId: ', projId);

			$http.delete(apiConstant.project.delete + '/' + projId)
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}
	}
})();