app.controller('authCtrl', function($scope, authFactory) {
  $scope.register = function() {
    authFactory.register($scope.user)
  };
});