app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/scheduler", {
            templateUrl: "../app/views/scheduler.html",
            controller: "schedulerCtrl"
        })
        .otherwise({
            redirectTo: "index.html"
        });
});