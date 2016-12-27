(function() {
    'use strict';

    angular
        .module('project')
        .controller('projectController', projectController);

    projectController.$inject = [];

    function projectController() {
        var projCtrl = this;


        /***  Declaration  ***/

        function nameEdit(){
            console.log('nameEdit');
        }
    }
})();