describe('passport middleware testing: ', function(){
  var q = require('q');
  var chai = require('chai');
  var chaiHttp = require('chai-http');
  var expect = chai.expect;
  var sinon = require('sinon');


  var loginCtrl = require('../controller/login.js');
  var passportConfig = require('./passport.js');

  var passportLogin = passportConfig.loginHandleMiiddleware;

  var user;


  beforeEach(function(){
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

  afterEach(function(){

  });

  it('should call callback with user data', function(done){
    var stubUserByName = sinon.stub(loginCtrl, 'getUserByUsername');
    stubUserByName.returns(q.when(user));

    var cbStub = sinon.spy(function (){});
    passportLogin('req', 'username', 'password', cbStub)
      .then(function(){
        expect(cbStub.calledWith(null, user)).to.be.true;
        stubUserByName.restore();
        done();
      });
  });

});
