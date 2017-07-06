app.controller('mainController', function ($scope, beerFactory) {
    $scope.addBeer = function (newBeer) {
        beerFactory.addBeer(newBeer)
            .then(function (beer) {
                $scope.beers.push(beer);
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    $scope.removeBeer = function (beerRemove) {
        beerFactory.removeBeer(beerRemove).then(function (beer) {
            var beer_id = findIndexByNameAndStyle(beerRemove.name, beerRemove.style);
            $scope.beers.splice(beer_id, 1);
        })
            .catch(function (error) {
                console.log(error)
            })
    };
    $scope.beers = [];
    beerFactory.getBeers().then(function (beers) {
        $scope.beers = beers;
    }).catch(function (error) {
        console.log(error)
    });


/////////////////helper functions
    var findIndexByNameAndStyle = function (name, style) {
    for (var i = 0; i < $scope.beers.length; i++) {
        if (($scope.beers[i].name === name) & ($scope.beers[i].style === style)) {
            return i;
        }
    }
    return -1;
}

})

var findIndexByNameAndStyle = function (name, style) {
    for (var i = 0; i < $scope.beers.length; i++) {
        if (($scope.beers[i].name === name) & ($scope.beers[i].style === style)) {
            return i;
        }
    }
    return -1;
}