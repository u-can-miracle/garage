describe('passport middleware testing: ', function(){
  var q = require('q');
  var chai = require('chai');
  var expect = chai.expect;
  var sinon = require('sinon');


  var loginCtrl = require('../controller/login.js');
  var passportConfig = require('./passport.js');
  var UserModel = require('../model/user.js');

  var passportLogin = passportConfig.loginHandleMiiddleware;
  var localConfirmEmailMiddleware = passportConfig.localConfirmEmailMiddleware;
  var fbLoginMiddleware = passportConfig.fbLoginMiddleware;

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


  describe('should call callback of loginHandleMiiddleware with ', function(){
    var stubUserByName;
    var cbSpy;
    beforeEach(function(){
      stubUserByName = sinon.stub(loginCtrl, 'getUserByUsername');
      cbSpy = sinon.spy(function (){});
    });

    afterEach(function(){
      stubUserByName.restore();
    });


    it('user data when user exist', function(done){
      stubUserByName.returns(q.when(user));

      passportLogin('req', 'username', 'password', cbSpy)
        .then(function(){
          
          expect(cbSpy.calledWithExactly(null, user)).to.be.true;
          done();
        });
    });


    it('false when user not found(null)', function(done){
      stubUserByName.returns(q.when(null));

      passportLogin('req', 'username', 'password', cbSpy)
        .then(function(){

          expect(cbSpy.calledWithExactly(null, false)).to.be.true;
          done();
        });
    }); 
  });
 

  describe('should call callback of localConfirmEmailMiddleware with ', function(){
    var stubUserByHash;
    var cbSpy;
    var hash = 'myHash';

    beforeEach(function(){
      stubUserByHash = sinon.stub(loginCtrl, 'getUserByHash');
      cbSpy = sinon.spy(function (){});
    });

    afterEach(function(){
      stubUserByHash.restore();
    });


    it('user data when user exist', function(done){
      stubUserByHash.returns(q.when(user));

      var stubUpdateConfirm = sinon.stub(loginCtrl, 'updateUserEmailConfirmation');

      localConfirmEmailMiddleware(hash, hash, cbSpy)
        .then(function(){

          expect(cbSpy.calledWithExactly(null, user)).to.be.true;
          expect(stubUpdateConfirm.calledWithExactly(hash)).to.be.true
          done();
        });
    });

    it('false when user doen\'t exist', function(done){
      stubUserByHash.returns(q.when(null));

      localConfirmEmailMiddleware(hash, hash, cbSpy)
        .then(function(){

          expect(cbSpy.calledWithExactly(null, false)).to.be.true;
          done();
        });
    });
  });


  describe('should call callback of fbLoginMiddleware with (null, user) when ', function(){
    var findStub;
    var createStub;
    var spy;
    var accessToken = 'accessToken';
    var refreshToken = 'refreshToken';
    var profile = {
        id: 'id',
        displayName: 'displayName'
    };

    beforeEach(function(){
      spy = sinon.spy();
      findStub = sinon.stub(UserModel, 'findOne');
      createStub = sinon.stub(UserModel, 'create');
    });

    afterEach(function(){
      findStub.restore();
      createStub.restore();
    });

    it('user exist', function(done){
      findStub.returns(q.when(user));


      fbLoginMiddleware(accessToken, refreshToken, profile, spy)
        .then(function(){

          expect(spy.callCount).to.equal(1);
          expect(spy.calledWithExactly(null, user)).to.be.true;
          done();
        });
    });

    it('user doesnot exist', function(done){
      findStub.returns(q.when(null));

      fbLoginMiddleware(accessToken, refreshToken, profile, spy)
        .then(function(sr){

          expect(createStub.callCount).to.equal(1);
          expect(spy.callCount).to.equal(1);
          expect(spy.calledWith(user)).to.be.false;
          done();
        });
    });    
  });
});
