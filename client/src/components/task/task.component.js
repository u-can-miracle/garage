(function() {
    'use strict';

    angular
        .module('task').component('task', {
            templateUrl: '/components/task/templates/task.html',
            controller: 'taskController',
            bindings: {
                task: '=',
                onDelete: '&'
            },
            controllerAs: 'taskCtrl'
        });
})();