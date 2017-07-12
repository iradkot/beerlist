var app = angular.module('beerList', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
}]);