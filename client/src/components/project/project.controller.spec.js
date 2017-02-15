describe('Test projectController: ', function() {
    var rootScope;
    var controller;
    var httpBeckend;
    var $q;
    var deferred;
    var logFactory;

    var vm;

    var mockProjectService;


    beforeEach(function() {
        module('project');

        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });

            $provide.service('projectService', function() {
                this.projectUpdate = sinon.stub();
                this.projectDelete = sinon.stub();
            });
        });
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _projectService_, _$q_, $injector) {
        rootScope = _$rootScope_;
        $controller = _$controller_;
        controller = $controller('projectController', {

        });
        $q = _$q_;
        deferred = $q.defer();

        vm = controller;  

        mockProjectService = _projectService_;
    }));



    /**************  TESTS  **************/
    /************************************/


    it('vm.projectUpdate() should call projectService.projectUpdate() with expected params', function() {
        mockProjectService.projectUpdate.returns($q.when('result'));
        vm.projectUpdate('id', 'name');

        expect(mockProjectService.projectUpdate.callCount).toEqual(1);
        expect(mockProjectService.projectUpdate.getCall(0).args[0]).toEqual('id');
        expect(mockProjectService.projectUpdate.getCall(0).args[1]).toEqual('name');
    });



    it('vm.projectDelete() should call projectService.projectDelete() with expected params', function() {
        mockProjectService.projectDelete.returns($q.when('result'));
        vm.projectDelete('idToDelete');

        expect(mockProjectService.projectDelete.callCount).toEqual(1);
        expect(mockProjectService.projectDelete.getCall(0).args[0]).toEqual('idToDelete');
    });    
    
});