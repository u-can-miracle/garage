describe('Test projectController: ', function() {
    var rootScope;
    var $q;
    var deferred;

    var vm;
    var mockMdDialogShowResult;

    var mockEntityService;
    var mockMdDialog;


    beforeEach(function() {
        module('project');

        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });

            $provide.service('entityService', function() {
                // this.go = sinon.stub();
            });

            $provide.factory('loginFactory', function() {
                return {
                    logout: sinon.stub().returns(Q.when('result'))
                };
            });
        });

        mockEntityService = {
            createEntity: sinon.stub(),
            updateEntity: sinon.stub().returns(Q.when('result')),
            deleteEntity: sinon.stub(),
            getAllProjects: sinon.stub().returns(Q.when('allProjResponse')),
            removeEntityFromArrayById: sinon.stub(),
            allProjects: 'allProjects'
        };

        mockMdDialog = {
            confirm: function() {
                return this;
            },
            title: function() {
                return this;
            },
            textContent: function() {
                return this;
            },
            ariaLabel: function() {
                return this;
            },
            ok: function() {
                return this;
            },
            cancel: function() {
                return this;
            },
            show: sinon.stub()
        };
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, $injector) {
        rootScope = _$rootScope_;

        $q = _$q_;
        deferred = $q.defer();

        vm = _$controller_('projectController', {
            entityService: mockEntityService,
            $mdDialog: mockMdDialog
        });
    }));



    /**************  TESTS  **************/
    /************************************/


    it('vm.updateProject() should call entityService.updateEntity() with expected params', function() {
        vm.updateProject('id', 'name');

        expect(mockEntityService.updateEntity.callCount).toEqual(1);
        expect(mockEntityService.updateEntity.getCall(0).args[0]).toEqual('project');
        expect(mockEntityService.updateEntity.getCall(0).args[1]).toEqual({
            id: 'id',
            name: 'name'
        });
    });


    describe('vm.deleteEntity() should: ', function() {
        it('call entityService.removeEntityFromArrayById() with expected params', function(done) {
            var deleteEntityResponse = {
                data: {
                    isRemoved: true
                }
            };

            mockMdDialog.show.returns(Q.when(true));
            mockEntityService.deleteEntity.returns(Q.when(deleteEntityResponse));

            vm.deleteProject('idToDelete')
                .then(function() {
                    expect(mockMdDialog.show.callCount).toEqual(1);
                    expect(mockEntityService.deleteEntity.callCount).toEqual(1);
                    expect(mockEntityService.removeEntityFromArrayById.callCount).toEqual(1);

                    expect(mockEntityService.removeEntityFromArrayById.getCall(0).args[0]).toEqual('allProjects');
                    expect(mockEntityService.removeEntityFromArrayById.getCall(0).args[1]).toEqual('idToDelete');

                    done();
                });
        });

        it('not call entityService.removeEntityFromArrayById()', function(done) {
            var deleteEntityResponse = {
                data: {
                    isRemoved: false
                }
            };

            mockMdDialog.show.returns(Q.when(true));
            mockEntityService.deleteEntity.returns(Q.when(deleteEntityResponse));

            vm.deleteProject('idToDelete')
                .then(function() {
                    expect(mockMdDialog.show.callCount).toEqual(1);
                    expect(mockEntityService.deleteEntity.callCount).toEqual(1);
                    expect(mockEntityService.removeEntityFromArrayById.callCount).toEqual(0);

                    done();
                });
        });

        it('not call entityService.removeEntityFromArrayById() and entityService.deleteEntity()', function(done) {
            mockMdDialog.show.returns(Q.when(false));

            vm.deleteProject('idToDelete')
                .then(function() {
                    expect(mockMdDialog.show.callCount).toEqual(1);
                    expect(mockEntityService.deleteEntity.callCount).toEqual(0);
                    expect(mockEntityService.removeEntityFromArrayById.callCount).toEqual(0);

                    done();
                });
        });
    });


    describe('vm.taskCreate() should: ', function() {
        var createdTask;

        beforeEach(function(){
            vm.project = {tasks: []};

            createdTask = {data: {task: 'task'}};
            mockEntityService.createEntity.returns(Q.when(createdTask));
        });



        it('call entityService.createEntity() with expected params', function(done) {
            vm.taskCreate('taskName', 'projId')
                .then(function(res) {
                    expect(mockEntityService.createEntity.callCount).toEqual(1);
                    expect(mockEntityService.createEntity.getCall(0).args[0]).toEqual('task');
                    expect(mockEntityService.createEntity.getCall(0).args[1]).toEqual({
                        taskName: 'taskName',
                        projId: 'projId'
                    });
                    done();
                });
        });

        it('update vm.taskName and vm.project', function(done) {
            vm.taskName = 'taskName';

            vm.taskCreate('taskName', 'projId')
                .then(function(res) {
                    expect(vm.taskName).toEqual('');
                    expect(vm.project.tasks[0]).toEqual('task');
                    done();
                });
        });        
    });


    describe('vm.deleteTask() should: ', function(){
        it('call entityService.deleteEntity with expected params', function(){
            mockEntityService.deleteEntity.returns(Q.when('data'));

            vm.deleteTask('idTask', 'idProj')
                .then(function(){
                    expect(mockEntityService.deleteEntity.callCount).toEqual(1);
                    expect(mockEntityService.deleteEntity.getCall(0).args[0]).toEqual('task');
                    expect(mockEntityService.deleteEntity.getCall(0).args[1]).toEqual('idTask');
                    expect(mockEntityService.deleteEntity.getCall(0).args[2]).toEqual('idProj');

                    done();
                });            
        });

        it('call entityService.removeEntityFromArrayById with expected params', function(done){
            mockEntityService.deleteEntity.returns(Q.when(true));
            vm.project = {tasks: []};

            vm.deleteTask('idTask', 'idProj')
                .then(function(){
                    expect(mockEntityService.removeEntityFromArrayById.callCount).toEqual(1);
                    expect(mockEntityService.removeEntityFromArrayById.getCall(0).args[0]).toEqual(vm.project.tasks);
                    expect(mockEntityService.removeEntityFromArrayById.getCall(0).args[1]).toEqual('idTask');

                    done();
                });
        });

        it('not call entityService.removeEntityFromArrayById', function(done){
            mockEntityService.deleteEntity.returns(Q.when(false));
            vm.project = {tasks: []};

            vm.deleteTask('idTask', 'idProj')
                .then(function(){
                    expect(mockEntityService.removeEntityFromArrayById.callCount).toEqual(0);

                    done();
                });
        });        
    });
});