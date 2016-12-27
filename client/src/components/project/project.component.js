(function() {
    'use strict';

    angular
        .module('project').component('project', {
            templateUrl: '/components/project/templates/project.html',
            controller: 'projectController',
            bindings: {
                project: '=',
                onEdit: '&',
                onDelete: '&'
            },
            controllerAs: 'projCtrl'
        });
})();