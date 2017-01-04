(function() {
    'use strict';

    angular
        .module('project')
        .controller('projContainerCtrl', projContainerCtrl);

    projContainerCtrl.$inject = [];

    function projContainerCtrl() {
        var projContCtrl = this;

        projContCtrl.projects = null;
        projContCtrl.deleteEntityFromArray = deleteEntityFromArray;






        init();

        /***  Declaration  ***/

        function init(){
            projContCtrl.projects = [{
                projectName: 'Project 1',
                tasks: [{
                    isCompleted: true,
                    taskTitle: '@TimBiegeleisen item.html itself has no controller. but its parent, "items.html" has a controller that set "names" to an array'
                }, {
                    isCompleted: false,
                    taskTitle: 'Basically what you have to do is use bindings to bind the data you are looping with ng-repeat to access it within your component.'
                }]
            }, {
                projectName: 'Project 2',
                tasks: [{
                    isCompleted: false,
                    taskTitle: '@TimBiegeleisen item.html itself has no controller. but its parent, "items.html" has a controller that set "names" to an array'
                }, {
                    isCompleted: true,
                    taskTitle: 'Basically what you have to do is use bindings to bind the data you are looping with ng-repeat to access it within your component.'
                }]
            }];
        }

        function deleteEntityFromArray(entity, array){
            var pos = array.indexOf(entity);

            return array.splice(pos, 1);
        }
    }
})();