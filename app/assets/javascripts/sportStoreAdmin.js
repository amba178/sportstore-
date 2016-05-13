var app = angular.module('sportsStoreAdmin', ['ngRoute', 'templates']);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/main', {

		templateUrl: 'adminMain.html'
	});

	
}]);