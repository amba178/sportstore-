angular.module("sportstores")
.constant("productUrl", "http://localhost:3000/products.json")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;})
.controller("productCtrl", function ($scope, $resource, productUrl) {
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
});
