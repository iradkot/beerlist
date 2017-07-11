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
                var beer_index;
                for (var i = 0; i < $scope.beers.length; i++) {
                    if ($scope.beers[i]._id == id) {
                        beer.average = avgRating(beer);
                        $scope.beers[i] = beer;
                        beer_index = i;
                    }
                }
                $scope.beers[beer_index].edit = {};
                $scope.beers[beer_index].edit.show = true;
                $scope.beers[beer_index].edit.clicked = function () {
                    this.show = !this.show;
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
                beer.edit = {
                    show: true,
                    clicked: function () {
                        this.show = !this.show;
                    }
                }
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
    $scope.addComment = function(_id, userName, comment) {
        beerFactory.addComment(_id, userName, comment)
        .then(function(beer){
            $scope.beers[findIndexByNameAndStyle(beer.name, beer.style)].reviews = beer.reviews;
        })
    }
    $scope.removeComment = function(beer_id, review_id) {
        beerFactory.removeComment(beer_id, review_id)
        .then(function(beer){
            var beer_index = findIndexById(beer_id, $scope.beers);
            var review_index = findIndexById(review_id, $scope.beers[beer_index].reviews);
            $scope.beers[beer_index].reviews.splice(review_index, 1);
        })
    }
    $scope.updateBeer = function (editedBeer, _id, beer_obj) {
        beerFactory.updateBeer(editedBeer, _id)
            .then(function (beer) {
                beer_obj.name = beer.name;
                beer_obj.abv = beer.abv;
                beer_obj.style = beer.style;
                beer_obj.image_url = beer.image_url;
                beer_obj.edit.clicked();
                console.log('beer updated');

                // $scope.beers.push(beer);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    beerFactory.getBeers()
        .then(function (beers) {
            for (var i = 0; i < beers.length; i++) {
                //adding average
                beers[i].average = avgRating(beers[i]);
                //adding edit obj, that shows and hide the edit view
                beers[i].edit = {
                    show: true,
                    clicked: function () {
                        this.show = !this.show;
                    }
                }
                // adding comments section to the beer
                beers[i].showComments = false;
            }

            $scope.beers = beers;
        }).catch(function (error) {
            console.log(error)
        });
    



    /////////////////helper functions
    var findIndexById = function(id, arr) {
        for (var index = 0; index < arr.length; index++) {
            if(arr[index]._id === id){
                return index;
            }
            
        }
        return -1;
    }

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

