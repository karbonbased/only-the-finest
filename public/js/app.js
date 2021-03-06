var app = angular.module('finestApp', ['ngRoute']);


// MAIN CONTROLLER //
app.controller('MainController', ['$http', '$scope', function($http, $scope){

 	var controller = this;
 	this.user = {};
	this.isLoggedIn = false;
	this.getUsers = function(){
		//console.log('Getting Users');
		$http({ method:'GET', url:'/users'}).then(function(response){
			controller.userList = response.data;
		});	
	}

	// SCOPE ON TO LISTEN FOR CHILDREN
	$scope.$on('UserInfo',  function(eventObj, data) {
		controller.user = data;
		controller.isLoggedIn = true;
		controller.getUsers();
	}) // closes scope.on

	this.getUsers();

	this.getLocations = function(){
		//console.log('Getting Locations')
		$http({ method:'GET', url:'/locations'}).then(function(response){
			controller.locationList = response.data;
		});
	}
	this.getLocations();

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


	this.addLocation = function(location){
		// var abcd = null;
		// this.abcd = location;

		$http({
			method: "PUT", 
			url: "/users/locationAdd/" + controller.user._id, 
			data: location
		})
		.then(
			function(response) {
				controller.getUsers();
				}, 
				function() {
					console.log(err);
				}
			);
	};


	 this.deleteLocation = function(location1){
	 	console.log('delete clicked')
	 	this.locationId = location1._id;
	 	console.log(location1)
		$http({
			method: "DELETE",
			url:'/users/' + controller.locationId,
			data: location1
		})
		.then (
			function(response) {
					controller.getUsers();
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
	//console.log(controller.userInfo)

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
			//console.log("::::::results.data is:::::::")
			//console.log(results.data)
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
		 	console.log(results.data)
			controller.user = results;
			//send the results to the parent controller
			$scope.$emit('UserInfo', results.data)
			});
		} //closes ajax call
	// } //closes login function

	// test ajax call to check session persistence
	$http({ url: '/users/currentUser', method: 'GET'}).then(function(result) {
		console.log('TEST AJAX CALL AFTER SIGNUP: ', result.data);
		});
}]);

app.controller('MapController', ['$scope', function($scope) {
	var controller = this;
	// call the map function, set to intialize function is maps.js		
	this.map = function(){
		controller.maps = initialize();
	}
}]);

//PARTIAL ROUTES//
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.when('/allusers', { //when http://localhost:3000/url1
        templateUrl: 'partials/userPartial.html', // render http://localhost:3000/partials/userPartial.html
        controller: 'MainController', // attach MainController 
        controllerAs: '/allusers' // alias for MainController 
    }).
    when('/alllocations', {
        templateUrl: 'partials/locationPartial.html',
        controller: 'MainController',
        controllerAs: '/alllocations'
    })
}]);



