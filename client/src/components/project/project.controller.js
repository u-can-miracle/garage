(function() {
    'use strict';

    angular
        .module('project')
        .controller('projectController', projectController);

    projectController.$inject = ['projectService'];

    function projectController(projectService) {
        var projCtrl = this;
        projCtrl.projectUpdate = projectService.projectUpdate;


        /***  Declaration  ***/

        function nameEdit(){
            console.log('nameEdit');
        }
    }
})();