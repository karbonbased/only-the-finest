var app = angular.module('finestApp', []);


// MAIN CONTROLLER //
app.controller('MainController', ['$http', '$scope', function($http, $scope){

 	var controller = this;

// call the map function, set to intialize function is maps.js		
	this.map = function(){
		controller.maps = initialize();
	}

	this.getUsers = function(){
		//console.log('Getting Users');
		$http({ method:'GET', url:'/users'}).then(function(response){
			controller.userList = response.data;
		});	
	}
	this.getUsers();

	this.getLocations = function(){
		//console.log('Getting Locations')
		$http({ method:'GET', url:'/locations'}).then(function(response){
			controller.locationList = response.data;
		});
	}
	this.getLocations();

	this.addUserForm = function(){
		//console.log('Formdata: ', this.userData);
		$http({ method:'POST', url:'/users', data:this.userData}).then(function(result){
			controller.getUsers();
		});
	};

	this.addLocationForm = function(){
		console.log('Formdata: ', this.locationData);
		$http({ method:'POST', url:'/locations', data:this.locationData}).then(function(result){
			controller.getLocations();
		});
	};


	this.deleteLocation = function($index){

		var user = this.user;
		console.log([$index])
		//console.log(this.user) // empty object
		console.log(this.locationList[$index])
		//console.log(this.userList[$index])// jen
		//console.log(this[$index]) // undefined
		//console.log(user.locations[$index]) // user is not defined
		//console.log(users.locations[$index]) // users is not defined
		//console.log(this.userData[$index])
		//console.log(locations[$index]); // error
		//console.log(location[$index]); // undefined

	};

	// set up user and a flag
	var controller = this;
	this.user = {};
	this.isLoggedIn = false;

	// SCOPE ON TO LISTEN FOR CHILDREN
	$scope.$on('UserInfo',  function(eventObj, data) {
		//console.log(data);

		//save the data to our variables and switch flag
		controller.user = data;
		controller.isLoggedIn = true;
	}) // closes scope.on

	// LOGOUT FUNCTION
	this.logout = function() {
		$http({
			method: "GET",
			url: ("users/logout")
		}) //closes $http, begin the promise
		.then( 
			function(results) {
				console.log("logout success")
				console.log(results);
				controller.isLoggedIn = false;
			}, //closes success route
			function(err) {
				console.log("error has occured in logout function");
				console.log(err);
			} //closes error route
		) //closes promise
	} //closes logout function

}]); //closes controller


// LOGIN CONTROLLER //
app.controller('LoginController', ['$http', '$scope', function($http, $scope) {
	this.userInfo = {
		email: null,
		password: null
	}
	var controller = this;
	console.log(controller.userInfo)

	

	this.login = function() {
		console.log("this.login route fired")
		// get the data from the login route
		$http({
			method: "POST",
			url: ("/users/login"),
			data: controller.userInfo
			})
		// use promise to fix asynchronous issue
		.then(function(results) {
			console.log("::::::results.data is:::::::")
			//console.log(results.data)
			//send the results to the parent controller
			$scope.$emit('UserInfo', results.data)
			},
			//failure
			function(err){
			console.log("::::::error has occured:::::::")
			console.log(err)
			});
		} //closes ajax call
	// } //closes login function
}])

// SIGNUP CONTROLLER
app.controller('SignupController', ['$http', '$scope', function($http, $scope) {

	this.userInfo = {
		name: null,
		gender: null,
		email: null,
		password: null
	}

	var controller = this;


	this.signup = function() {
		console.log(this.userInfo)
		// get the data from the login route
		$http({
			method: "POST",
			url: ("/users/signup"),
			data: controller.userInfo
			})
		// use promise to fix asynchronous issue
		.then(function(results) {
			console.log("::::::results.data is:::::::")
			// console.log(results)
		 	console.log(results.data)
			//send the results to the parent controller
			$scope.$emit('UserInfo', results.data)
			// controller.getUsers();
			},
			//failure
			function(err){
			console.log("::::::error has occured:::::::")
			console.log(err)
			});
		} //closes ajax call
	// } //closes login function
}])