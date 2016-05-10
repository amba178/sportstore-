var app = angular.module('sportstores', ['ngRoute', 'templates',
    'ngResource', 'ngMessages','ui.bootstrap', 'customFilters', 'cart']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: "sportsStoresCtrl",
        templateUrl: "products_list.html"
    }).when('/checkout', {
        controller: 'productListCtrl',
        templateUrl: 'checkoutSummary.html'

    })

}]);

// app.constant('dataUrl', 'http://localhost:3000/products.json')

app.constant('dataUrl', 'https://sportstores.herokuapp.com/products.json')

app.controller('sportsStoresCtrl', ['$scope', '$http','dataUrl', function ($scope, $http, dataUrl) {
    $scope.data = {};
    $http.get(dataUrl).then(function(response) {
        $scope.data.products = response.data;

    }, function(response) {
        console.log(response.statusText);
        $scope.data.status = response.status;
        $scope.data.statusText = response.statusText;
    });

}])