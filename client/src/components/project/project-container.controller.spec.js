describe('Test projContainerCtrl: ', function() {
    var $controller;
    var vm;
    var logFactory;

    var vm;
    var initStub;

    var mockProjectService, mockLoginFactory, mockState;

    beforeAll(function() {
        var allProjResponse = {
            data: {
                allProjects: [{
                    proj1: 'proj1'
                }, {
                    proj2: 'proj2'
                }]
            }
        };
        var createdProject = {
            data: {
                proj: {proj3: 'createdProject'}
            }
        };

        mockProjectService = {
            projectCreate: sinon.stub().returns(Q.when(createdProject)),
            projectUpdate: sinon.stub().returns(Q.when('result')),
            projectDelete: sinon.stub().returns(Q.when('result')),
            getAllProjects: sinon.stub().returns(Q.when(allProjResponse))
        }
    });


    beforeEach(function() {
        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });

            $provide.factory('loginFactory', function() {
                return {
                    logout: sinon.stub().returns(Q.when('result'))
                };
            });

            $provide.service('$state', function() {
                this.go = sinon.stub();
            });
        });

        module('project');

        angular.mock.module(function($provide) {
            $provide.constant('apiConstant', {
                project: {
                    getAll: '/test/getAll',
                    create: '/test/create'
                }
            });
        });
    });



    beforeEach(inject(function(_$controller_, _loginFactory_, _$state_) {
        $controller = _$controller_;

        mockLoginFactory = _loginFactory_;
        mockState = _$state_;


        vm = $controller('projContainerCtrl', {
            projectService: mockProjectService
        });
    }));



    /**************  TESTS  **************/
    /************************************/


    it('init method should call vm.getAllProjects()', function() {
        var getAllProjStub = sinon.stub(vm, 'getAllProjects');
        vm.init();
        expect(vm.getAllProjects.callCount).toEqual(1);
    });


    describe('logout() should call: ', function() {
        it('loginFactory.logout()', function(done) {
            vm.logout()
                .then(function() {
                    expect(mockLoginFactory.logout.callCount).toEqual(1);
                    done();
                });
        });

        it('$state.go()', function(done) {
            vm.logout()
                .then(function() {
                    expect(mockState.go.callCount).toEqual(1);
                    done();
                });
        });

        it('$state.go() with expected params', function(done) {
            vm.logout()
                .then(function() {
                    expect(mockState.go.getCall(0).args[0]).toEqual('main.login');
                    done();
                });
        });
    });


    it('deleteEntityFromArray should delete entity', function() {
        var array = ['aaa', 'bbb', 'ccc'];
        vm.deleteEntityFromArray('bbb', array);
        expect(array).toEqual(['aaa', 'ccc']);
    });


    describe('getAllProjects should: ', function() {
        it('call projectService.getAllProjects', function(done) {
            var calls = mockProjectService.getAllProjects.callCount; // called by init()

            vm.getAllProjects()
                .then(function() {
                    expect(mockProjectService.getAllProjects.callCount).toEqual(calls + 1);
                    done();
                });
        });

        it('set expected data to vm.projects', function(done) {
            vm.projects = {};

            vm.getAllProjects()
                .then(function() {
                    expect(vm.projects).toEqual([{
                        proj1: 'proj1'
                    }, {
                        proj2: 'proj2'
                    }])

                    done();
                });
        });
    });


    describe('projectCreate should: ', function(){
        it('call projectService.projectCreate with expected params', function(done){
            vm.projectCreate('data')
                .then(function(){
                    expect(mockProjectService.projectCreate.callCount).toEqual(1);
                    done();
                });
        });

        it('call projectService.projectCreate with expected params', function(done){
            vm.projectCreate('data')
                .then(function(){
                    expect(mockProjectService.projectCreate.getCall(0).args[0]).toEqual('data');
                    done();
                });
        });

        it('set expected data', function(done){
            vm.projects = [];
            vm.projectCreate('data')
                .then(function(){
                    expect(vm.projects).toContain({proj3: 'createdProject'});
                    expect(vm.isProjectCreateFormVisible).toEqual(false);
                    done();
                });
        });        
    });
});