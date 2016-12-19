describe('loginRouter: ', function() {
    var q = require('q');
    var chai = require('chai');
    var chaiHttp = require('chai-http');
    var expect = chai.expect;
    var sinon = require('sinon');


    // Stub passport before usage in app
    var passport = require('passport');
    var passStub = sinon.stub(passport, 'authenticate');
    passStub.returns(function(req, res, next){ next() });



    var app = require('../../server.js');
    var loginCtrl = require('../controller/login.js');



    before(function() {
        chai.use(chaiHttp);
    });



    /***************  Tests  ***************/
    /**************************************/

    describe('/login ', function() {
        var user;
        var stubByName;
        var stubByPass;

        beforeEach(function() {
            user = {
                local: {
                    username: 'username',
                    email: 'email',
                    password: 'password',
                    registrationKey: 'registrationKey',
                    isUserConfirmedViaEmail: true
                },
                facebook: {
                    id: 'facebookId',
                    accessToken: 'fbToken',
                    name: 'fbName'
                }
            };

            stubByName = sinon.stub(loginCtrl, "getUserByUsername");
            stubByPass = sinon.stub(loginCtrl, "getUserByPassword");
        });

        afterEach(function(){
          stubByName.restore();
          stubByPass.restore();
        });


        /***  Unit Tests  ***/

        it('should return {successRegistered: true} with right user data', function(done) {
          stubByName.returns(q.when(user));
          stubByPass.returns(q.when(user));

          chai.request(app)
            .post('/login')
            .send(user)
            .end(function(req, res) {

              expect(res.body.loginSuccess).to.be.true;
              done();
            });
        });

        it('should return {successRegistered: false} without user name', function(done) {
          stubByName.returns(q.when(null));
          stubByPass.returns(q.when(user));

            chai.request(app)
                .post('/login')
                .send(user)
                .end(function(req, res) {

                  expect(res.body.loginSuccess).to.be.false;
                  expect(res.body.message).to.be.equal('Username or password is wrong');
                  done();
                });
        });

        it('should return {successRegistered: false} without user password', function(done) {
          stubByName.returns(q.when(user));
          stubByPass.returns(q.when(null));

            chai.request(app)
                .post('/login')
                .send(user)
                .end(function(req, res) {

                  expect(res.body.loginSuccess).to.be.false;
                  expect(res.body.message).to.be.equal('Username or password is wrong');
                  done();
                });
        });

        it('should return right response to not confirmed user', function(done){
          user.local.isUserConfirmedViaEmail = false;
          stubByName.returns(q.when(user));
          stubByPass.returns(q.when(user));

          chai.request(app)
            .post('/login')
            .send(user)
            .end(function(erq, res){
              
              expect(res.body.loginSuccess).to.be.false;
              expect(res.body.message).to.be.equal('Chech your email and confirm your account');
              done();
            });
        });
    });
});
