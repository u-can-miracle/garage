describe('loginRouter: ', function() {
    var app = require('../../server.js');

    var chai = require('chai');
    var expect = chai.expect;

    var mockery = require('mockery');
    var supertest = require('supertest');
    var sinon = require('sinon');
	var mongooseMock = require('mongoose-mock');
	var proxyquire = require('proxyquire');


    before(function() {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    after(function() {
    	mockery.disable();
    });


    beforeEach(function() {
    });


    afterEach(function() {
    });



    /***************  Tests  ***************/
    /**************************************/

    describe('/login', function(){
    	var super_test;
    	beforeEach(function(){
	        super_test = supertest(app)
	            .post('/login')
	            .set('Content-Type', 'application/json');    		
    	});
	    
	    it('should set user session with right user data', function(done) {
	    	super_test
	            .send('{"username": "confirmedUser", "password": "pass1"}')
	            .expect(200)
	            .end(function(err, res) {
	                expect(res.body.loginSuccess).to.be.true;
	                expect(res.body.user.local.username).to.be.equal('confirmedUser');
		            done();
		        });
	    });

	    it('should sent confirm email notification when user is not confirmed via email', function(done){
			super_test
	    		.send('{"username": "notConfirmedUser", "password": "pass2"}')
	    		.expect(200)
	    		.end(function(err, res){
	    			expect(res.body.loginSuccess).to.be.false;
	    			expect(res.body.message).to.be.equal('Chech your email and confirm your account');
	    			done();
	    		});
	    });

	    it('should sent notification when user data is wrong', function(done){
			super_test
	    		.send('{"username": "notExistingUser", "password": "notExistingPassword"}')
	    		.expect(200)
	    		.end(function(err, res){
	    			expect(res.body.loginSuccess).to.be.false;
	    			expect(res.body.message).to.be.equal('Username or password is wrong');
	    			done();
	    		});
	    });	    
    });

    describe.only('/registration', function(){
    	var super_test;

    	beforeEach(function(){
	    	super_test = supertest(app)
	            .post('/registration')
	            .set('Content-Type', 'application/json');
    	});


    	afterEach(function(){
    		
    	});
    	


        it.only('should respond with success for registration not existing user', function(done){
        	super_test
        		.send('{"username": "newdUser", "email": "newuser@gmail.com", "password": "pass1"}')
        		.expect(200)
        		.end(function(err, res){
        			console.log(res.body);
        			expect(res.body.successRegistered).to.be.true;
					done();
        		});
        });	

        it('should send email for new registered user with right address', function(done){
        	var loginCtrl = require('../controller/login.js');
        	var sendEmailStub = sinon.stub(loginCtrl, 'sendEmail');


        	super_test
        		.send('{"username": "newdUser", "email": "newuser@gmail.com", "password": "pass1"}')
        		.expect(200)
        		.end(function(err, res){
        			expect(sendEmailStub.callCount).to.equal(1);
        			expect(sendEmailStub.calledWith("newuser@gmail.com")).to.be.true;

        			sendEmailStub.restore();
					done();
        		});
        });	


        it.skip('should create new user model after registration not existing user with right data', function(done){
            var userModelMock = {
                create: sinon.stub()
            };
            mockery.registerMock('../model/user.js', userModelMock);

        	super_test
        		.send('{"username": "sdgshehedh", "email": "nesdfhser@gmail.com13", "password": "pass1"}')
        		.expect(200)
        		.end(function(err, res){
        			console.log('userModelMock.create.callCount', userModelMock.create.callCount);
					done();
        		});        	
        });
    });
});