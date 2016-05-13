var app = angular.module('sportstores');

// app.constant('localDataUrl', 'http://localhost:3000/products.json');
app.constant('orderUrl', 'https://sportstores.herokuapp.com/orders.json');
// app.constant('orderUrl', 'http://localhost:3000/orders.json');

app.controller('orderProductsCtrl', ['$scope', '$http','$location','cart', 'orderUrl', '$resource', 
    '$rootScope', function ($scope, $http, $location, cart, orderUrl, $resource, $rootScope) {
    $rootScope.data = {};
    $scope.createResource = $resource("/orders.json",{"save": {"method": "POST"}});
    
    $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .then(function (response) {
                    $rootScope.data.orderId = response.data.id;
                    cart.getProducts().length = 0;
                },
                function (response) {
                    $scope.data.orderError = response.status;
                }).finally(function () {
                    $location.path("/complete");
                });
        }

}]);