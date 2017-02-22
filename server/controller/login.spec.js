describe('login controller: ', function() {
    var q = require('q');
    var chai = require('chai');
    var expect = chai.expect;
    var sinon = require('sinon');



    var mongoose = require('mongoose');
    require('sinon-mongoose');

    var config = require('../config/config.js');
    var loginCtrl = require('./login.js');
    var userModel = mongoose.model('User');





    /****  Tests  ****/
    describe.skip('userModel.updateUserEmailConfirmation should call callback: ', function() {
        /****  Prepearing  ****/
        var spy = sinon.spy();
        var userModelMock = sinon.mock(userModel);
        var user = {
            local: {
                isUserConfirmedViaEmail: false,
                registrationKey: 'key'
            }
        };
        userModelMock
            .expects('update')
            .yields(null, 'result');

        // var stubUpdateConfirm = sinon.stub(loginCtrl, 'updateUserEmailConfirmation');


        /****  Execution  ****/
        it('with expected params', function() {
            loginCtrl.updateUserEmailConfirmation('hash', spy)
                // userModelMock.verify();
            expect(spy.callCount).to.eql(1);
            expect(spy.getCall(0).args[1]).to.eql('result');
            userModelMock.restore();
        });
    });


    describe('userModel.findById: ', function() {
        /****  Prepearing  ****/
        var userModelStub;
        beforeEach(function() {
            userModelStub = sinon.stub(userModel, 'findById').returns(q.when('result'));
        });

        afterEach(function() {
            userModelStub.restore();
        });



        /****  Execution  ****/
        it('', function(done) {
            loginCtrl.getUserById('userID')
                .then(function() {
                    expect(userModelStub.callCount).to.eql(1);
                    done();
                });
        });

        it('with expected params', function(done) {
            loginCtrl.getUserById('userID')
                .then(function() {
                    expect(userModelStub.getCall(0).args[0]).to.eql('userID');
                    done();
                });
        });
    });



    describe('userModel.getUserByUsername: ', function() {
        /****  Prepearing  ****/
        var userModelStub;
        beforeEach(function() {
            userModelStub = sinon.stub(userModel, 'findOne').returns(q.when('result'));
        });

        afterEach(function() {
            userModelStub.restore();
        });



        /****  Execution  ****/
        it('', function(done) {
            loginCtrl.getUserByUsername('userName')
                .then(function() {
                    expect(userModelStub.callCount).to.eql(1);
                    done();
                });
        });

        it('with expected params', function(done) {
            loginCtrl.getUserByUsername('userName')
                .then(function() {
                    expect(userModelStub.getCall(0).args[0]).to.eql({
                        'local.username': 'userName'
                    });
                    done();
                });
        });
    });



    describe('userModel.getUserByEmail: ', function() {
        /****  Prepearing  ****/
        var userModelStub;
        beforeEach(function() {
            userModelStub = sinon.stub(userModel, 'findOne').returns(q.when('result'));
        });

        afterEach(function() {
            userModelStub.restore();
        });



        /****  Execution  ****/
        it('', function(done) {
            loginCtrl.getUserByEmail('userEmail')
                .then(function() {
                    expect(userModelStub.callCount).to.eql(1);
                    done();
                });
        });

        it('with expected params', function(done) {
            loginCtrl.getUserByEmail('userEmail')
                .then(function() {
                    expect(userModelStub.getCall(0).args[0]).to.eql({
                        'local.email': 'userEmail'
                    });
                    done();
                });
        });
    });



    describe('userModel.getUserByPassword: ', function() {
        /****  Prepearing  ****/
        var userModelStub;
        beforeEach(function() {
            userModelStub = sinon.stub(userModel, 'findOne').returns(q.when('result'));
        });

        afterEach(function() {
            userModelStub.restore();
        });



        /****  Execution  ****/
        it('', function(done) {
            loginCtrl.getUserByPassword('userPass')
                .then(function() {
                    expect(userModelStub.callCount).to.eql(1);
                    done();
                });
        });

        it('with expected params', function(done) {
            loginCtrl.getUserByPassword('userPass')
                .then(function() {
                    expect(userModelStub.getCall(0).args[0]).to.eql({
                        'local.password': 'userPass'
                    });
                    done();
                });
        });
    });



    describe('userModel.getUserByHash: ', function() {
        /****  Prepearing  ****/
        var userModelStub;
        beforeEach(function() {
            userModelStub = sinon.stub(userModel, 'findOne').returns(q.when('result'));
        });

        afterEach(function() {
            userModelStub.restore();
        });



        /****  Execution  ****/
        it('', function(done) {
            loginCtrl.getUserByHash('userHash')
                .then(function() {
                    expect(userModelStub.callCount).to.eql(1);
                    done();
                });
        });

        it('with expected params', function(done) {
            loginCtrl.getUserByHash('userHash')
                .then(function() {
                    expect(userModelStub.getCall(0).args[0]).to.eql({
                        'local.registrationKey': 'userHash'
                    });
                    done();
                });
        });
    });




    describe('ensureAuthenticated() ', function() {
        /****  Prepearing  ****/
        var request;
        var response;
        var next;

        beforeEach(function() {
            request = {
                isAuthenticated: sinon.stub()
            }
            response = {
                redirect: sinon.stub()
            }
            next = sinon.spy();
        });



        /****  Execution  ****/
        it('should call next()', function() {
            request.isAuthenticated.returns(true);
            loginCtrl.ensureAuthenticated(request, response, next);

            expect(next.callCount).to.eql(1);
            expect(response.redirect.callCount).to.eql(0);
        });

        it('should call response.redirect()', function() {
            request.isAuthenticated.returns(false);
            loginCtrl.ensureAuthenticated(request, response, next);

            expect(next.callCount).to.eql(0);
            expect(response.redirect.callCount).to.eql(1);
            expect(response.redirect.getCall(0).args[0]).to.eql('/login');
        });        
    });
});