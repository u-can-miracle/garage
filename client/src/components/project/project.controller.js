(function() {
    'use strict';

    angular
        .module('project')
        .controller('projectController', projectController);

    projectController.$inject = ['entityService', '$mdDialog'];

    function projectController(entityService, $mdDialog) {
        var projCtrl = this;

        projCtrl.updateProject = updateProject;
        projCtrl.deleteProject = deleteProject;
        projCtrl.taskCreate = taskCreate;
        projCtrl.deleteTask = deleteTask;
        projCtrl.removeEntityFromArrayById = entityService.removeEntityFromArrayById;


        /***  Declaration  ***/

        function updateProject(id, name) {
            var updateData = {
                id: id,
                name: name
            };
            entityService.updateEntity('project', updateData)
                .then(function(resp) {
                    console.log('resp', resp);
                })
                .catch(function(err) {
                    console.log('err', err);
                });
        }

        function deleteProject(id) {
            var confirm = $mdDialog.confirm()
                .title('Remove project?')
                .textContent('Are you really want to remove this project?')
                .ariaLabel('Remove project?')
                .ok('Yes remove project!')
                .cancel('Do not remove');


            return $mdDialog.show(confirm).then(function(result) {
                if (result === true) {
                    return entityService.deleteEntity('project', id)
                        .then(function(resp) {
                            if(resp.data.isRemoved){
                                entityService.removeEntityFromArrayById(entityService.allProjects, id);
                            }
                        })
                        .catch(function(err) {
                            console.log('err', err);
                        });
                }
            });
        }

        function taskCreate(taskName, projId){
            var taskData = {
                taskName: taskName,
                projId: projId
            }

            return entityService.createEntity('task', taskData)
                .then(function(resp){
                    projCtrl.taskName = '';
                    projCtrl.project.tasks.push(resp.data.task);
                });
        }

        function deleteTask(idTask, idProj){
            return entityService.deleteEntity('task', idTask, idProj)
                .then(function(result){
                    if(result){
                        entityService.removeEntityFromArrayById(projCtrl.project.tasks, idTask);
                    }
                });
        }
    }
})();