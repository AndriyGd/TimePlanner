let app = angular.module("app", ["kendo.directives", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/scheduler", {
            templateUrl: "../front/views/scheduler.html",
            controller: "schedulerController"
        })
        .otherwise({
            redirectTo: "index.html"
        });
});