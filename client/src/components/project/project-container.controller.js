(function() {
    'use strict';

    angular
        .module('project')
        .controller('projContainerCtrl', projContainerCtrl);

    projContainerCtrl.$inject = ['entityService', 'loginFactory', '$state'];

    function projContainerCtrl(entityService, loginFactory, $state) {
        var projContCtrl = this;

        projContCtrl.projects = null;
        projContCtrl.isProjectCreateFormVisible = false;

        projContCtrl.init = init;
        projContCtrl.removeEntityFromArrayById = entityService.removeEntityFromArrayById;
        projContCtrl.getAllProjects = getAllProjects;
        projContCtrl.createProject = createProject;
        projContCtrl.logout = logout;




        projContCtrl.init();



        /***  Declaration  ***/


        function init(){
            projContCtrl.getAllProjects();
        }


        function logout(){
            return loginFactory.logout()
                .then(function(resp){
                    $state.go('main.login');
                })
                .catch(function(err){
                    console.log('logout err', err);
                });
        }    

        function getAllProjects(){
            return entityService.getAllProjects()
                .then(function(resp){
                    entityService.allProjects = resp.data.allProjects;
                    return projContCtrl.projects = entityService.allProjects;
                })
                .catch(function(err){
                    console.log('getAllProjects err', err);
                    return err;
                });
        }

        function createProject(projectName){
            var data = {projectName: projectName};

            return entityService.createEntity('project', data)
                .then(function(resp){
                    projContCtrl.newProjectName = '';
                    projContCtrl.projects.push(resp.data.proj);
                    projContCtrl.isProjectCreateFormVisible = false;
                })
                .catch(function(err){
                    console.log('ctrl err', err);
                });
        }
    }
})();


