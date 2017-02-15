describe('Test Task Ctrl: ', function() {
    var $controller;
    var taskCtrl;
    var mockMdDialog = {
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
        targetEvent: function() {
            return this;
        },
        ok: function() {
            return this;
        },
        cancel: function() {
            return this;
        }
    }




    beforeEach(function() {
        module(function($provide) {
            $provide.service('$$isDocumentHidden', function() {
                this.go = sinon.stub();
            });
        });

        module('task');
    });

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;

        taskCtrl = $controller('taskController', {
            $mdDialog: mockMdDialog
        });
    }));




    /**************  TESTS  **************/
    /************************************/

    it('Task ctrl should exist', function() {
        expect(taskCtrl).toBeDefined();
    });

    describe('taskCtrl.deleteItem() should ', function() {
        var showStub;
        var onDeleteStub;

        beforeEach(function(){
            taskCtrl.onDelete = function(){};

            onDeleteStub = sinon.stub(taskCtrl, 'onDelete');
            showStub = sinon.stub(mockMdDialog, 'show');
        });

        afterEach(function(){
            onDeleteStub.restore();
            showStub.restore();
        });



        it('call $mdDialog.show()', function(done) {
            showStub.returns(Q.when('data'));

            taskCtrl.deleteItem()
                .then(function() {
                    expect(showStub.callCount).toEqual(1);
                    done();
                });
        });

        it('call taskCtrl.onDelete', function(done) {
            showStub.returns(Q.when(true));

            taskCtrl.deleteItem()
                .then(function() {
                    expect(taskCtrl.onDelete.callCount).toEqual(1);
                    done();
                });
        });

        it('call taskCtrl.onDelete', function(done) {
            showStub.returns(Q.when(false));

            taskCtrl.deleteItem()
                .then(function() {
                    expect(taskCtrl.onDelete.callCount).toEqual(0);
                    done();
                });
        });        
    });
});