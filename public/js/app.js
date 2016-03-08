var app = angular.module('finestApp', []);


// MAIN CONTROLLER //
app.controller('MainController', ['$http', '$scope', function($http, $scope){

 	var controller = this;
 	this.user = {};
	this.isLoggedIn = false;

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

	/*
	this.updateUser = function(){
		$http({ method:'POST', url:'/users', data:currentUser}).then(function(result){
			controller.getUsers();
		});
	};
	*/

	// SCOPE ON TO LISTEN FOR CHILDREN
	$scope.$on('UserInfo',  function(eventObj, data) {
		controller.user = data;
		controller.isLoggedIn = true;
		console.log("Within mainController: User info received from loginController emit: ", controller.user);
	}) // closes scope.on

	this.addLocationForm = function(){
		console.log('Formdata: ', this.locationData);
		$http({ method:'POST', url: '/locations', data: this.locationData }).then(function(result){
			controller.getLocations();

			//put route to users, this will update the current user
			$http({method: "PUT", url: "/users/" + controller.user._id, data: result.data }).then(function(results) {
					controller.getUsers();
				}), function() {
					console.log(err);
				}
			});
	};

 this.deleteLocation = function(location1){
 	
 	this.locationId = location1._id;
 	console.log(this.locationId) // location ID
 	console.log(controller.locationId) //location ID

	//console.log(this.location)


	$http({
		method: "DELETE",
		url:'/users/' + controller.locationId
	})
	.then (
		function(response) {
				console.log('RESPONSE FROM THE SERVER IN THE CLIENT: ', response.data);
		}, 
		function(err){
			console.log(err)
		}
	)
 };

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
			url: '/users/login',
			data: controller.userInfo
			})
		// use promise to fix asynchronous issue
		.then(function(results) {
			console.log("::::::LOGIN results.data is:::::::")
			console.log(results.data)
			// console.log(results)
			controller.user = results;
			//send the results to the parent controller
			$scope.$emit('UserInfo', results.data);


			// test ajax call to check session persistence
			$http({ url: '/users/currentUser', method: 'GET'}).then(function(result) {

				console.log('TEST AJAX CALL AFTER LOGIN: ', result.data);

			});

			},
			//failure
			function(err){
			console.log("::::::LOGIN FAILED, INVALID USER:::::::")
			console.log(err)
			});
		} //closes ajax call

}]);

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
			controller.user = results;
			//send the results to the parent controller
			$scope.$emit('UserInfo', results.data);

						// test ajax call to check session persistence
			$http({ url: '/users/currentUser', method: 'GET'}).then(function(result) {
				console.log('TEST AJAX CALL AFTER SIGNUP: ', result.data);
			});
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