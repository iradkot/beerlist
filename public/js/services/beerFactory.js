app.factory('beerFactory', function ($http) {
    
    var getBeers = function () {
        return $http.get('http://localhost:8000/beers')
            .then(function (response) {
                return angular.copy(response.data);
            });
    }
    var addBeer = function (newBeer) {
        return $http.post('/beers', newBeer)
            .then(function (response) {
                return angular.copy(response.data)
            });
    }
    var removeBeer = function (beerToRemove) {
        return $http.delete('/beers/' + beerToRemove._id)
            .then(function (response) {
                return;
            });
    }
    return {
        getBeers: getBeers,
        addBeer: addBeer,
        removeBeer: removeBeer

    }
});