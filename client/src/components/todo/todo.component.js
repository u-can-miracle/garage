(function() {
    'use strict';

    angular
        .module('todo').component('todoItem', {
            templateUrl: '/components/todo/templates/todo-item.html',
            controller: todoItemController,
            bindings: {
                todo: '=',
                onUpdate: '&',
                onDelete: '&'
            },
            controllerAs: 'itemCtrl'
        });

    todoItemController.$inject = ['$mdDialog'];

    function todoItemController($mdDialog) {
        var itemCtrl = this;

        itemCtrl.deleteItem = deleteItem;



        /***  Declaration  ***/

        function deleteItem(ev) {
            var confirm = $mdDialog.confirm()
                .title('Remove task?')
                .textContent('Are you really want to remove task from this todo?')
                .ariaLabel('Remove task?')
                .targetEvent(ev)
                .ok('Yes remove task!')
                .cancel('Do not remove');

                $mdDialog.show(confirm).then(function(result) {
                    if(true === result){
                        itemCtrl.onDelete({todo: itemCtrl.todo});
                    }
                });
        }
    }
})();