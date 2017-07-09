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
    var addRating = function (id, rating) {
        return $http.post('/beers/' + id + '/ratings', { rating: rating })
            .then(function (response) {
                return angular.copy(response.data)
            });
    }
    var updateBeer = function (beer, _id) {
        return $http.put('/beers/' + _id, beer)
            .then(function (response) {
                return response.data
            });
    };
    return {
        getBeers: getBeers,
        addRating: addRating,
        addBeer: addBeer,
        removeBeer: removeBeer,
        updateBeer: updateBeer
    }
});