(function() {
	'use strict';

	angular
	  .module('project')
	  .service('entityService', entityService);

	entityService.$inject = ['$http', '$q', 'apiConstant'];

	function entityService($http, $q, apiConstant) {
		this.allProjects = [];
		
		this.getAllProjects = getAllProjects;
		this.createEntity = createEntity;
		this.updateEntity = updateEntity;
		this.deleteEntity = deleteEntity;
		this.removeEntityFromArrayById = removeEntityFromArrayById;


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

		function createEntity(entityType, entityData){
			var defer = $q.defer();
			var endpoint;

			if(entityType === 'project'){
				endpoint = apiConstant.project.create
			} else if(entityType === 'task'){
				endpoint = apiConstant.task.create
			}			

			$http.post(endpoint, entityData)
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}		

		function updateEntity(entityType, updatedData){
			var defer = $q.defer();
			var endpoint;

			if(entityType === 'project'){
				endpoint = apiConstant.project.update;
			} else if(entityType === 'task'){
				endpoint = apiConstant.task.update;
			}

			$http.put(endpoint, updatedData)
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}

		function deleteEntity(entityType, entityId, parentEntityId){
			var defer = $q.defer();
			var parentIdUrl = parentEntityId ? '/' + parentEntityId : '';
			var endpoint;

			if(entityType === 'project'){
				endpoint = apiConstant.project.delete
			} else if(entityType === 'task'){
				endpoint = apiConstant.task.delete
			}

			$http.delete(endpoint + '/' + entityId + parentIdUrl)
				.then(function(resp){
					defer.resolve(resp);
				})
				.catch(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}

        function removeEntityFromArrayById(array, entityId){
        	var entity = _.find(array, {_id: entityId});
        	var index = array.indexOf(entity);

        	array.splice(index, 1);
        }			
	}
})();