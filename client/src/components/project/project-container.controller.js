(function() {
    'use strict';

    angular
        .module('project')
        .controller('projContainerCtrl', projContainerCtrl);

    projContainerCtrl.$inject = ['projectService', 'loginFactory', '$state'];

    function projContainerCtrl(projectService, loginFactory, $state) {
        var projContCtrl = this;

        projContCtrl.projects = null;
        projContCtrl.isProjectCreateFormVisible = false;

        projContCtrl.deleteEntityFromArray = deleteEntityFromArray;
        projContCtrl.getAllProjects = getAllProjects;
        projContCtrl.projectCreate = projectCreate;
        projContCtrl.logout = logout;




        init();



        /***  Declaration  ***/


        function init(){
            projContCtrl.getAllProjects();
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

        function deleteEntityFromArray(entity, array){
            var pos = array.indexOf(entity);

            return array.splice(pos, 1);
        }  

        function getAllProjects(){
            projectService.getAllProjects()
                .then(function(resp){
                    projContCtrl.projects = resp.data.allProjects;
                })
                .catch(function(err){
                    console.log('getAllProjects err', err);
                });
        }

        function projectCreate(projectName){
            return projectService.projectCreate(projectName)
                .then(function(resp){
                    projContCtrl.projects.push(resp.data.proj);
                    projContCtrl.isProjectCreateFormVisible = false;
                })
                .catch(function(err){
                    console.log('ctrl err', err);
                });
        }
    }
})();


