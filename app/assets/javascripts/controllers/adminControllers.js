var app = angular.module('sportsStoreAdmin');


// app.constant('ordersUrl', "http://localhost:3000/orders.json");
app.constant('orderUrl', 'https://sportstores.herokuapp.com/orders.json');


app.controller("mainCtrl", ['$scope', function ($scope) {

    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function () {
        return $scope.current == "Products"
            ? "adminProducts.html" : "adminOrders.html";
    };
}])


app.controller("ordersCtrl", ['$scope', '$http', 'ordersUrl', function ($scope, $http, ordersUrl) {
    $scope.loading = true;
    $http.get(ordersUrl).then( function(response) {
            $scope.orders = response.data;
        }, 
         function(response) {
            $scope.error = response.status;
        }).finally( function(){
            $scope.loading = false;
        });

    $scope.selectedOrder;

    $scope.selectOrder = function (order) {
        $scope.selectedOrder = order;
        // console.log($scope.selectedOrder);
    };

    $scope.calcTotal = function (order) {
        var total = 0;
        for (var i = 0; i < order.products.length; i++) {
            total +=
                order.products[i].price * order.order_lines[i].count;
        }
        return total;
    }
}]);
