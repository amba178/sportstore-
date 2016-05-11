var app = angular.module('sportstores');

app.constant('localDataUrl', 'http://localhost:3000/products.json');
app.constant('productionDataUrl', 'https://sportstores.herokuapp.com/products.json');
app.constant('orderUrl', 'https://sportstores.herokuapp.com/orders.json');
// app.constant('orderUrl', 'http://localhost:3000/orders.json')

app.controller('sportsStoresCtrl', ['$scope', '$http','productionDataUrl','localDataUrl',
    '$location','cart', 'orderUrl', '$resource', function ($scope, $http, productionDataUrl, localDataUrl, 
        $location, cart, orderUrl, $resource) {
    
        var dataUrl = null;
        if($location.host()=='localhost'){
            dataUrl = localDataUrl;
        }else{
            dataUrl = productionDataUrl;
        }

    $http.get(dataUrl).then(function(response) {
        $scope.data = {};
        $scope.data.products = response.data;
    }, function(response) {
        $scope.data.status = response.status;
        $scope.data.statusText = response.statusText;
    });

}])