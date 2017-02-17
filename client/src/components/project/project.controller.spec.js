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

            $provide.service('entityService', function() {
                this.updateEntity = sinon.stub();
                this.deleteEntity = sinon.stub();
            });
        });
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, _entityService_, _$q_, $injector) {
        rootScope = _$rootScope_;
        $controller = _$controller_;
        controller = $controller('projectController', {

        });
        $q = _$q_;
        deferred = $q.defer();

        vm = controller;  

        mockProjectService = _entityService_;
    }));



    /**************  TESTS  **************/
    /************************************/


    it('vm.updateEntity() should call entityService.updateEntity() with expected params', function() {
        mockProjectService.updateEntity.returns($q.when('result'));
        vm.updateEntity('id', 'name');

        expect(mockProjectService.updateEntity.callCount).toEqual(1);
        expect(mockProjectService.updateEntity.getCall(0).args[0]).toEqual('id');
        expect(mockProjectService.updateEntity.getCall(0).args[1]).toEqual('name');
    });



    it('vm.deleteEntity() should call entityService.deleteEntity() with expected params', function() {
        mockProjectService.deleteEntity.returns($q.when('result'));
        vm.deleteEntity('idToDelete');

        expect(mockProjectService.deleteEntity.callCount).toEqual(1);
        expect(mockProjectService.deleteEntity.getCall(0).args[0]).toEqual('idToDelete');
    });    
    
});