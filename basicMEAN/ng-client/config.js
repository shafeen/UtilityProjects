angular.module('basicMEAN', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/view1/view1",
            controller: "View1Ctrl as view1"
        })
        .when("/view1", {
            templateUrl: "partials/view1/view1",
            controller: "View1Ctrl as view1"
        })
        .when("/view2", {
            templateUrl: "partials/view2/view2",
            controller: "View2Ctrl as view2"
        });
});