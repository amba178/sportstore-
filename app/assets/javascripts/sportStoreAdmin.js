var app = angular.module('sportstores');

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/main', {

		templateUrl: 'adminMain.html'
	});

	
}]);