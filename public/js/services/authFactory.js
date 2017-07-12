app.factory('authFactory', function ($http) {

    var auth = {};
    auth.currentUser = {};

    auth.register = function (user) {
        return $http.post('/users/register', user)
            .then(function (response) {
                auth.currentUser.username = response.data.username
            });;
    };

    auth.login = function (user) {
        return $http.post('/users/login', user)
            .then(function (response) {
                auth.currentUser.username = response.data.username
            });
    };

    auth.getCurrentUser = function () {
        return $http.get('/users/currentUser')
            .then(function (response) {
                auth.currentUser.username = response.data.username;
            });;
    };
    auth.logout = function (user) {
        return $http.get('/users/logout')
            .then(function (response) {
                auth.currentUser.username = null;
                alert("You logged out!");
            });
    };

    return auth;
});