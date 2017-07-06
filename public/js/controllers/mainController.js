app.controller('mainController', function ($scope, beerFactory) {
    $scope.order = { type: 'name' };
    var edit = {};
    $scope.edit = edit;
    edit.show = true;
    edit.clicked = function () {
        edit.show = !edit.show;
    }





    ///// add rating
    $scope.addRating = function (id, rating) {
        beerFactory.addRating(id, rating)
            .then(function (beer) {
                for (var i = 0; i < $scope.beers.length; i++) {
                    if ($scope.beers[i]._id == id) {
                        beer.average = avgRating(beer);
                        $scope.beers[i] = beer;
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /////// from faactory add/get/remove beer, add rating
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
        beerFactory.removeBeer(beerRemove)
            .then(function (beer) {
                var beer_id = findIndexByNameAndStyle(beerRemove.name, beerRemove.style);
                $scope.beers.splice(beer_id, 1);
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    beerFactory.getBeers()
        .then(function (beers) {
            for (var i = 0; i < beers.length; i++) {
                beers[i].average = avgRating(beers[i]);
                beers[i].edit = {
                show: true,
                clicked: function () {
                    this.show = !this.show;
                }
            }

            }
            
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

    var avgRating = function (beer) {
        rating = arrayAverage(beer.ratings);
        rating *= 100
        return Math.floor(rating) / 100;
    }

    var arrayAverage = function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (sum / arr.length);
    }

})

