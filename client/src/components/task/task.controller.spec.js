describe('Test Task Ctrl: ', function() {
    var $controller;
    var taskCtrl;
    var mockMdDialog;
    var mockEntityService;




    beforeEach(function() {
        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });
        });

        module('task');

        mockMdDialog = {
            show: function() {},
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
            }
        };

        mockEntityService = {
            createEntity: sinon.stub(),
            updateEntity: function() {},
            deleteEntity: sinon.stub(),
            getAllProjects: sinon.stub().returns(Q.when('allProjResponse')),
            removeEntityFromArrayById: sinon.stub(),
            allProjects: 'allProjects'
        };
    });

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;

        taskCtrl = $controller('taskController', {
            $mdDialog: mockMdDialog,
            entityService: mockEntityService
        });
    }));




    /**************  TESTS  **************/
    /************************************/

    it('Task ctrl should exist', function() {
        expect(taskCtrl).toBeDefined();
    });

    it('taskCtrl.updateTaskStatus should call taskCtrl.updateEntity with expected params', function(done) {
        var updateEntityStub = sinon.stub(mockEntityService, 'updateEntity').returns(Q.when('result'));

        taskCtrl.updateTaskStatus('taskId', 'isCompleted')
            .then(function() {
                expect(updateEntityStub.callCount).toEqual(1);
                expect(updateEntityStub.getCall(0).args[0]).toEqual('task');
                expect(updateEntityStub.getCall(0).args[1]).toEqual({
                    id: 'taskId',
                    isCompleted: 'isCompleted'
                });
                updateEntityStub.restore();
                done();
            });
    }); 

    it('taskCtrl.updateTaskName should call taskCtrl.updateTaskName with expected params', function(done) {
        var updateEntityStub = sinon.stub(mockEntityService, 'updateEntity').returns(Q.when('result'));

        taskCtrl.updateTaskName('taskId', 'newName')
            .then(function() {
                expect(updateEntityStub.callCount).toEqual(1);
                expect(updateEntityStub.getCall(0).args[0]).toEqual('task');
                expect(updateEntityStub.getCall(0).args[1]).toEqual({
                    id: 'taskId',
                    name: 'newName'
                });
                updateEntityStub.restore();
                done();
            });
    });    

    describe('taskCtrl.deleteTask() should ', function() {
        var showStub;
        var onDeleteStub;

        beforeEach(function() {
            taskCtrl.onDelete = function() {};

            onDeleteStub = sinon.stub(taskCtrl, 'onDelete');
            showStub = sinon.stub(mockMdDialog, 'show');
        });

        afterEach(function() {
            onDeleteStub.restore();
            showStub.restore();
        });



        it('call $mdDialog.show()', function(done) {
            showStub.returns(Q.when('data'));

            taskCtrl.deleteTask()
                .then(function() {
                    expect(showStub.callCount).toEqual(1);
                    done();
                });
        });

        it('call taskCtrl.onDelete', function(done) {
            showStub.returns(Q.when(true));

            taskCtrl.deleteTask()
                .then(function() {
                    expect(taskCtrl.onDelete.callCount).toEqual(1);
                    done();
                });
        });

        it('call taskCtrl.onDelete', function(done) {
            showStub.returns(Q.when(false));

            taskCtrl.deleteTask()
                .then(function() {
                    expect(taskCtrl.onDelete.callCount).toEqual(0);
                    done();
                });
        });
    });
});