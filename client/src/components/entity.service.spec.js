describe('Test entityService: ', function() {
    var q;
    var http;
    var apiConstant;
    var entityService;

    beforeEach(function() {
        module('project');


        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });

            $provide.service('$http', function() {
                this.post = function() {};
                this.get = function() {};
                this.put = function() {};
                this.delete = function() {};
            });
        });

        angular.mock.module(function($provide) {
            $provide.constant('apiConstant', {
                project: {
                    getAll: '/test/getAll',
                    create: '/test/create',
                    update: '/test/update',
                    delete: '/test/delete'
                }
            });
        });
    });

    beforeEach(inject(function(_$http_, _$q_, _entityService_) {
        http = _$http_;
        q = _$q_;

        entityService = _entityService_;
    }));





    /**************  TESTS  **************/
    /************************************/


    it('check entityService exist', function() {
        expect(entityService).toBeDefined();
    });



    it('entityService.getAllProjects should call http.get()', function() {
        var getStub = sinon.stub(http, 'get').returns(q.when('result'));

        expect(http.get.callCount).toEqual(0);
        entityService.getAllProjects();
        expect(http.get.getCall(0).args[0]).toEqual('/test/getAll');
        expect(http.get.callCount).toEqual(1);

        getStub.restore();
    });



    it('entityService.createEntity should call http.post() with expected data', function() {
        var postStub = sinon.stub(http, 'post').returns(q.when('result'));

        expect(http.post.callCount).toEqual(0);
        entityService.createEntity('projectName');

        expect(http.post.callCount).toEqual(1);
        expect(http.post.getCall(0).args[0]).toEqual('/test/create');
        expect(http.post.getCall(0).args[1]).toEqual({
            projectName: 'projectName'
        });

        postStub.restore();
    });



    it('entityService.updateEntity should call http.put() with expected data', function() {
        var putStub = sinon.stub(http, 'put').returns(q.when('result'));
        var updatedData = {
            projId: 'projId',
            projName: 'projName'
        };

        expect(http.put.callCount).toEqual(0);
        entityService.updateEntity('projId', 'projName');

        expect(http.put.callCount).toEqual(1);
        expect(http.put.getCall(0).args[0]).toEqual('/test/update');
        expect(http.put.getCall(0).args[1]).toEqual({
            projId: 'projId',
            projName: 'projName'
        });

        putStub.restore();
    });



    it('entityService.deleteEntity should call http.post() with expected data', function() {
        var deleteStub = sinon.stub(http, 'delete').returns(q.when('result'));
        var updatedData = {
            projId: 'projId',
            projName: 'projName'
        };

        expect(http.delete.callCount).toEqual(0);
        entityService.deleteEntity('123')

        expect(http.delete.callCount).toEqual(1);
        expect(http.delete.getCall(0).args[0]).toEqual('/test/delete/123');

        deleteStub.restore();
    });
});