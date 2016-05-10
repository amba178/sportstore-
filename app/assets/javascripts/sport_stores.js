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

app.constant('localDataUrl', 'http://localhost:3000/products.json');
app.constant('productionDataUrl', 'https://sportstores.herokuapp.com/products.json');

app.controller('sportsStoresCtrl', ['$scope', '$http','productionDataUrl','localDataUrl','$location', 
    function ($scope, $http, productionDataUrl, localDataUrl, $location) {
    $scope.data = {};
         
        var dataUrl = "";
        if($location.host()=='localhost'){
            dataUrl = localDataUrl;
        }else{
            dataUrl = productionDataUrl;
        }
    

    $http.get(dataUrl).then(function(response) {
        $scope.data.products = response.data;

    }, function(response) {
        console.log(response.statusText);
        $scope.data.status = response.status;
        $scope.data.statusText = response.statusText;
    });

}])