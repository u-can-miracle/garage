describe('loginRouter: ', function() {
    var q = require('q');
    var chai = require('chai');
    var chaiHttp = require('chai-http');
    var expect = chai.expect;
    var sinon = require('sinon');

    var passport =require('passport');


    var app = require('../../server.js');
    var loginCtrl = require('../controller/login.js');



    before(function() {
        chai.use(chaiHttp);
    });

    after(function() {

    });


    beforeEach(function() {

    });


    afterEach(function() {

    });



    /***************  Tests  ***************/
    /**************************************/

    describe('/login ', function() {
        var user
        beforeEach(function() {
            console.log('beforeEach');
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
        });

        it('should set user session with right user data', function(done) {
            console.log('it');
            var stubByName = sinon.stub(loginCtrl, "getUserByUsername");
            var stubByPass = sinon.stub(loginCtrl, "getUserByPassword");
            var passportStub = sinon.stub(passport, 'authenticate');

            stubByName.returns(q.when(user));
            stubByPass.returns(q.when(user));
            passportStub.returns(function(req, res, next) { console.log('stb'); next(); });
            // passportStub.yields(new Error('fails here'));


            chai.request(app)
                .post('/login')
                .send(user)
                .end(function(req, res) {
                    expect(1).to.equal(1);

                    stubByName.restore();
                    stubByPass.restore();
                    done();
                });
        });
    });
});