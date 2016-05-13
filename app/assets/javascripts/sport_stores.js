var app = angular.module('sportstores', ['ngRoute', 'templates',
    'ngResource', 'ngMessages','ui.bootstrap', 'customFilters', 'cart']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: "sportsStoresCtrl",
        templateUrl: "products_list.html"
    }).when('/checkout', {
        controller: 'cartSummaryController',
        templateUrl: 'checkoutSummary.html'

    }).when('/placeorder',{ 
        controller: 'orderProductsCtrl',
        templateUrl: 'placeOrder.html'
    }).when('/complete', {
        templateUrl: 'thankYou.html'
    }).when('/main', {
        templateUrl: 'adminMain.html'
    });

}]);
