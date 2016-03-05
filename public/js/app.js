var app = angular.module('finestApp', []);


app.controller('MainController', ['$http', function($http){
	this.hello = 'i am working';

		this.map = function(){
			this.maps = initialize();
		}

}]);