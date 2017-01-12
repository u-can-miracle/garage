(function() {
    'use strict';

    angular
        .module('project')
        .controller('projContainerCtrl', projContainerCtrl);

    projContainerCtrl.$inject = ['projectService', 'loginFactory', '$state'];

    function projContainerCtrl(projectService, loginFactory, $state) {
        var projContCtrl = this;

        projContCtrl.projects = null;
        projContCtrl.deleteEntityFromArray = deleteEntityFromArray;
        projContCtrl.createProject = projectService.createProject;
        projContCtrl.logout = logout;




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

        function logout(){
            loginFactory.logout()
                .then(function(resp){
                    $state.go('main.login');
                })
                .catch(function(err){
                    console.log('logout err', err);
                });
        }   
    }
})();