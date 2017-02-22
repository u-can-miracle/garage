describe('taskRouter: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');



    var app = require('../../server.js');
    var taskCtrl = require('../controller/task.js');
    var entityCtrl = require('../controller/entity.js');

    var taskRouter = require('./task.js');


    var request = {};
    var response = {
        json: function() {}
    };



    /***************  Tests  ***************/
    /**************************************/



    it('createTaskMiddleware() should call taskCtrl.createTask', function(done) {
        var createTaskStub = sinon.stub(taskCtrl, 'createTask').returns(q.when('data'));

        request = {
            body: {
                taskName: 'taskName',
                projId: 'projId'
            }
        };

        taskRouter.createTaskMiddleware(request, response)
            .then(function(proj) {
                expect(createTaskStub.callCount).to.eql(1);
                expect(createTaskStub.getCall(0).args[0]).to.eql('taskName');
                expect(createTaskStub.getCall(0).args[1]).to.eql('projId');
                done();
            });
    });



    it('updateTaskMiddleware() should call entityCtrl.updateEntity()', function(done) {
        var updateEntityStub = sinon.stub(entityCtrl, 'updateEntity').returns(q.when('data'));

        request.body = {
            name: 'updatedTaskName',
            id: 'taskId'
        };

        taskRouter.updateTaskMiddleware(request, response)
            .then(function(res) {
                expect(updateEntityStub.callCount).to.eql(1);
                expect(updateEntityStub.getCall(0).args[0]).to.eql('task');
                expect(updateEntityStub.getCall(0).args[1]).to.eql({
                    name: 'updatedTaskName',
                    id: 'taskId'
                });
                updateEntityStub.restore();
                done();
            });
    });



    it('deleteTaskMiddleware() should call taskCtrl.deleteTask()', function(done) {
        var deleteTaskStub = sinon.stub(taskCtrl, 'deleteTask').returns(q.when('data'));
        request.params = {
            taskId: 'taskId',
            projId: 'projId'
        };
        taskRouter.deleteTaskMiddleware(request, response)
            .then(function() {
                expect(deleteTaskStub.callCount).to.eql(1);
                expect(deleteTaskStub.getCall(0).args[0]).to.eql('taskId');
                expect(deleteTaskStub.getCall(0).args[1]).to.eql('projId');
                done();
            })
    });
});