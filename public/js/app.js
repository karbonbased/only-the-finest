var app = angular.module('finestApp', []);


app.controller('MainController', ['$http', function($http){
	this.hello = 'i am working';
 
 var controller = this;
		this.map = function(){
			console.log('sup fools');
			controller.maps = initialize();
			console.log(this)
		}

}]);