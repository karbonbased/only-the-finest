var app = angular.module('finestApp', []);


app.controller('MainController', ['$http', function($http){
	this.hello = 'i am working';
 
 	var controller = this;
		
	this.map = function(){
		console.log('sup fools');
		controller.maps = initialize();
		console.log(this)
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

	this.addLocationForm = function(){
		console.log('Formdata: ', this.locationData);
		$http({ method:'POST', url:'/locations', data:this.locationData}).then(function(result){
			controller.getLocations();
		});

	/*
		$http({ method:'POST', url:'/locations', data:this.locationData}).then(function(result) {
			//Make sure add location to current user
			currentUser.locations.append(result);
			controller.updateUser();
		}).then(function(result){
			controller.getLocations();
		});
	*/	
	
	};

}]);