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
	//SCOPE ON TO LISTEN FOR CHILDREN
	$scope.$on('UserInfo',  function(eventObj, data) {
		//save the data to our variables and switch flag
		//controller.user = current user (when user is loggedIn)
		controller.user = data;
		controller.isLoggedIn = true;
		controller.getUsers();
	}) // closes scope.on

	//call the map function, set to intialize function is maps.js		
	this.map = function(){
		controller.maps = initialize();
	}
	this.getUsers();

	this.getLocations = function(){
		//console.log('Getting Locations')
		$http({ method:'GET', url:'/locations'}).then(function(response){
			controller.locationList = response.data;
		});
	}
	this.getLocations();

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

	this.addLocationForm = function(){
		console.log('Formdata: ', this.locationData);
		$http({ method:'POST', url:'/locations', data:this.locationData}).then(function(result){
			controller.getLocations();
			//put route to users, this will update the current user
			$http({method: "PUT", url: "/users/" + controller.user._id, data: result.data}).then(function(results) {
					controller.getUsers();
					//Clear location input fields after submit
					controller.locationData.name = undefined;
          controller.locationData.lat = undefined;
          controller.locationData.lng = undefined;
				}), function() {
					console.log(err);
				}
			});
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
		 	console.log(results.data)
			controller.user = results;
			//send the results to the parent controller
			$scope.$emit('UserInfo', results.data)
			});
		} //closes ajax call
	// } //closes login function
}]);

//PARTIAL ROUTES//
/*myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.when('/url1', { //when http://localhost:3000/url1
        templateUrl: 'partials/partial1.html', // render http://localhost:3000/partials/partial1.html
        controller: 'Ctrl1', // attach controller Ctrl1
        controllerAs: 'ctrl' // alias for Ctrl1 (like ng-controller="Ctrl1 as ctrl")
    }).
    when('/url2', {
        templateUrl: 'partials/partial2.html',
        controller: 'Ctrl1',
        controllerAs: 'ctrl'
    }).
    when('/url3/:id', {
        templateUrl: 'partials/partial3.html',
        controller: 'Ctrl3',
        controllerAs: 'ctrl'
    });
}]);*/



