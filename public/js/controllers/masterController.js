app.controller('masterController', function($scope, authFactory) {
    $scope.logout = function () {
        authFactory.logout($scope.user)
            .then(function () {
                $state.go('home');
            }, function (err) {
                alert(err.data);
            });
    }
    authFactory.getCurrentUser()
    .then(function(){
        $scope.currentUser = authFactory.currentUser;
    })

});
