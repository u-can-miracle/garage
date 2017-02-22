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
                    getAll: '/projects/getAll',
                    create: '/project/create',
                    update: '/project/update',
                    delete: '/project/delete'
                },
                task: {
                    create: '/task/create',
                    update: '/task/update',
                    delete: '/task/delete'
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
        expect(http.get.getCall(0).args[0]).toEqual('/projects/getAll');
        expect(http.get.callCount).toEqual(1);

        getStub.restore();
    });



    describe('entityService.createEntity should create: ', function() {
        var postStub;

        beforeEach(function(){
            postStub = sinon.stub(http, 'post').returns(q.when('result'));
        });

        afterEach(function(){
            postStub.restore();
        });

        it('project', function(){
            expect(http.post.callCount).toEqual(0);
            entityService.createEntity('project', 'projectName');

            expect(http.post.callCount).toEqual(1);
            expect(http.post.getCall(0).args[0]).toEqual('/project/create');
            expect(http.post.getCall(0).args[1]).toEqual('projectName');
        });

        it('task', function(){
            expect(http.post.callCount).toEqual(0);
            entityService.createEntity('task', 'taskName');

            expect(http.post.callCount).toEqual(1);
            expect(http.post.getCall(0).args[0]).toEqual('/task/create');
            expect(http.post.getCall(0).args[1]).toEqual('taskName');
        });        
    });



    describe('entityService.updateEntity should update: ', function() {
        var putStub;

        beforeEach(function(){
            putStub = sinon.stub(http, 'put').returns(q.when('result'));
        });

        afterEach(function(){
            putStub.restore();
        });

        it('project', function(){
            expect(putStub.callCount).toEqual(0);
            entityService.updateEntity('project', 'updatedData');

            expect(putStub.callCount).toEqual(1);
            expect(putStub.getCall(0).args[0]).toEqual('/project/update');
            expect(putStub.getCall(0).args[1]).toEqual('updatedData');
        });

        it('task', function(){
            expect(putStub.callCount).toEqual(0);
            entityService.updateEntity('task', 'updatedData');

            expect(putStub.callCount).toEqual(1);
            expect(putStub.getCall(0).args[0]).toEqual('/task/update');
            expect(putStub.getCall(0).args[1]).toEqual('updatedData');
        });        
    });



    describe('entityService.deleteEntity should delete: ', function() {
        var deleteStub;

        beforeEach(function(){
            deleteStub = sinon.stub(http, 'delete').returns(q.when('result'));
        });

        afterEach(function(){
            deleteStub.restore();
        });

        it('project', function(){
            expect(deleteStub.callCount).toEqual(0);
            entityService.deleteEntity('project', 'projectId');

            expect(deleteStub.callCount).toEqual(1);
            expect(deleteStub.getCall(0).args[0]).toEqual('/project/delete/projectId');
        });

        it('task', function(){
            expect(deleteStub.callCount).toEqual(0);
            entityService.deleteEntity('task', 'taskId', 'projectId');

            expect(deleteStub.callCount).toEqual(1);
            expect(deleteStub.getCall(0).args[0]).toEqual('/task/delete/taskId/projectId');
        }); 
    });

    describe('entityService.removeEntityFromArrayById should: ', function(){
        var array;

        beforeEach(function(){
            array = [{_id: 1}, {_id: 2}];
        });   

        it('remove entity with existing id', function(){
            expect(array).toEqual([{_id: 1}, {_id: 2}]);
            entityService.removeEntityFromArrayById(array, 2);
            expect(array).toEqual([{_id: 1}]);
        });

        it('remove entity with existing id', function(){
            expect(array).toEqual([{_id: 1}, {_id: 2}]);
            entityService.removeEntityFromArrayById(array, 3);
            expect(array).toEqual([{_id: 1}, {_id: 2}]);
        });
    });    
});