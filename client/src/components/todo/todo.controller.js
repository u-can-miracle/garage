(function() {
    'use strict';

    angular
        .module('todo')
        .controller('todoCtrl', todoCtrl);

    todoCtrl.$inject = [];

    function todoCtrl() {
        var vm = this;

        vm.deleteTodoItem = deleteTodoItem;

        /***  Declaration  ***/

        vm.todo = [{
            isCompleted: true,
            todoTitle: '@TimBiegeleisen item.html itself has no controller. but its parent, "items.html" has a controller that set "names" to an array'
        }, {
            isCompleted: false,
            todoTitle: 'Basically what you have to do is use bindings to bind the data you are looping with ng-repeat to access it within your component.'
        }];

        function deleteTodoItem(item){
        	var pos = vm.todo.indexOf(item);
        	vm.todo.splice(pos, 1);
        }
    }
})();