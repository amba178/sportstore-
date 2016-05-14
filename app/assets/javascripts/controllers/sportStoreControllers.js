var app = angular.module('sportstores');

app.constant('localDataUrl', 'http://localhost:3000/products.json');
app.constant('productionDataUrl', 'https://sportstores.herokuapp.com/products.json');
// app.constant('orderUrl', 'https://sportstores.herokuapp.com/orders.json');
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

app.constant("productListActiveClass", "btn-primary")
    app.constant("productListPageCount", 3)
    app.controller("productListCtrl", ['$scope','$filter','productListActiveClass','productListPageCount','cart', 
        function($scope, $filter, productListActiveClass, productListPageCount, cart) {

        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }
        $scope.categoryFilterFn = function(product) {
            return selectedCategory == null || product.category == selectedCategory;
        }
        $scope.getCategoryClass = function(category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;
        }
        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }
        $scope.addProductToCart = function(product) {
            cart.addProduct(product.id, product.name, product.price);
        }
    }]);

// app.constant('orderUrl', 'http://localhost:3000/orders.json');
app.constant('orderUrl', 'https://sportstores.herokuapp.com/orders.json');
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

app.controller('cartSummaryController', ['$scope','cart', function($scope, cart){
    $scope.cartData = cart.getProducts();
    $scope.total = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        return total;
    }
    
    $scope.remove = function (id) {
        cart.removeProduct(id);
    }
    
}]);



// app.constant("productUrl", "http://localhost:3000/products.json")
app.constant('productUrl', 'https://sportstores.herokuapp.com/products.json');
app.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;})
app.controller("productCtrl", [ '$scope', '$resource', 'productUrl', function ($scope, $resource, productUrl) {
    $scope.products = {};

    $scope.productsResource = $resource("/products/:id.json", { id: "@id" },
        {"save": {"method": "PUT"}});
    $scope.createResource = $resource("/products.json",{"save": {"method": "POST"}});

    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    $scope.createProduct = function (product) {
        new $scope.createResource(product).$save().then(function (newProduct) {
            newProduct.id = $scope.products.length + 1;
            $scope.products.push(newProduct);
            $scope.editedProduct = null;
        });
    }
    
    $scope.updateProduct = function (product) {
        product.$save();
        // console.log(product)
        $scope.editedProduct = null;
    }

    $scope.startEdit = function (product) {
        $scope.editedProduct = product;
    }

    $scope.cancelEdit = function () {
        $scope.editedProduct = null;
    }

    $scope.listProducts();
}]);




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


