app.controller('masterController', function($scope, authFactory) {
  
    authFactory.getCurrentUser()
    .then(function(){
        $scope.currentUser = authFactory.currentUser;
    })

});
