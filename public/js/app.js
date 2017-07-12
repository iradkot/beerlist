var app = angular.module('beerList', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/templates/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
        }).state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'AuthCtrl'
        })

    $urlRouterProvider.otherwise('/home');
}]);