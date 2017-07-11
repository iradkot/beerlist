var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    userName: String,
    comment: String
});

var beerSchema = new Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    ratings: [Number],
    reviews: [reviewSchema]
});

var Comment = mongoose.model('Comment', reviewSchema);

var Beer = mongoose.model('Beer', beerSchema);


module.exports = Beer;

