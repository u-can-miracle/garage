describe('Test loginFactory: ', function(){
	var httpBackend;
	var http;
	var q;
	var deferred;

	var loginFactory;

	beforeEach(function(){
		module('login');

		module(function($provide){
			$provide.service('$http', function(){
				this.post = sinon.stub();
			});
		});
	});


	beforeEach(inject(function(_$httpBackend_, _$http_, _$q_, _loginFactory_) {
		httpBackend = _$httpBackend_;
		http = _$http_;
		q = _$q_;
		deferred = q.defer();

		loginFactory = _loginFactory_;
	}));


    
    /**************  TESTS  **************/
    /************************************/


	it('check loginFactory exist', function(){
		expect(loginFactory).toBeDefined();
	});

	it('loginFactory.registration should send user data', function(){
		http.post.returns(deferred.promise);
		loginFactory.registration("username", "email", "password");


		expect(http.post.getCall(0).args[0]).toEqual('/registration');
		expect(http.post.getCall(0).args[1]).toEqual({
			username: "username", 
			email: "email",
			password: "password"
		});		
	});

	it('loginFactory.login should send user data', function(){
		http.post.returns(deferred.promise);
		loginFactory.login("username", "password");


		expect(http.post.getCall(0).args[0]).toEqual('/login');
		expect(http.post.getCall(0).args[1]).toEqual({
			username: "username", 
			password: "password"
		});		
	});	

	it('loginFactory.setCurrentUser and loginFactory.setCurrentUser should set and get new user data', function(){
		expect(loginFactory.getCurrentUser()).toBeUndefined();


		loginFactory.setCurrentUser({name: 'name'});


		expect(loginFactory.getCurrentUser()).toEqual({name: 'name'});
	});

	it('loginFactory.isAuthenticated should return Boolean value of current user', function(){
		expect(loginFactory.isAuthenticated()).toEqual(false);


		loginFactory.setCurrentUser({name: 'name'});


		expect(loginFactory.isAuthenticated()).toEqual(true);
	});
});