(function() {
    'use strict';

    angular
        .module('project')
        .controller('projectController', projectController);

    projectController.$inject = ['projectService'];

    function projectController(projectService) {
        var projCtrl = this;

        projCtrl.projectUpdate = projectUpdate;
        projCtrl.projectDelete = projectDelete;


        /***  Declaration  ***/

        function projectUpdate(id, name){
            projectService.projectUpdate(id, name)
                .then(function(resp){
                    console.log('resp', resp);
                })
                .catch(function(err){
                    console.log('err', err);
                });
        }

        function projectDelete(id){
            projectService.projectDelete(id)
                .then(function(resp){
                    console.log('resp', resp);
                })
                .catch(function(err){
                    console.log('err', err);
                });
        }        
    }
})();