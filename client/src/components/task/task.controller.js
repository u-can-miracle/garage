(function() {
	'use strict';

	angular
	  .module('task')
	  .controller('taskController', taskController);

    taskController.$inject = ['$mdDialog', 'entityService'];

    function taskController($mdDialog, entityService) {
        var taskCtrl = this;

        taskCtrl.updateTaskStatus = updateTaskStatus;
        taskCtrl.updateTaskName = updateTaskName;
        taskCtrl.deleteTask = deleteTask;



        /***  Declaration  ***/

        function updateTaskStatus(taskId, isCompleted){
            var updateData = {
                id: taskId,
                isCompleted: isCompleted
            };
            return entityService.updateEntity('task', updateData);            
        }

        function updateTaskName(taskId, newName){
            var updateData = {
                id: taskId,
                name: newName
            };
            return entityService.updateEntity('task', updateData);
        }

        function deleteTask() {
            var confirm = $mdDialog.confirm()
                .title('Remove task?')
                .textContent('Are you really want to remove task from this todo?')
                .ariaLabel('Remove task?')
                .ok('Yes remove task!')
                .cancel('Do not remove');

                return $mdDialog.show(confirm).then(function(result) {
                    if(true === result){
                        taskCtrl.onDelete();
                    } 
                });
        }
    }
})();