(function() {
	'use strict';

	angular
	  .module('task')
	  .controller('taskController', taskController);

    taskController.$inject = ['$mdDialog'];

    function taskController($mdDialog) {
        var taskCtrl = this;

        taskCtrl.deleteItem = deleteItem;



        /***  Declaration  ***/

        function deleteItem(ev) {
            var confirm = $mdDialog.confirm()
                .title('Remove task?')
                .textContent('Are you really want to remove task from this todo?')
                .ariaLabel('Remove task?')
                .targetEvent(ev)
                .ok('Yes remove task!')
                .cancel('Do not remove');

                return $mdDialog.show(confirm).then(function(result) {
                    if(true === result){
                        taskCtrl.onDelete({todo: taskCtrl.todo});
                    }
                });
        }
    }
})();