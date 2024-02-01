const mongoose = require('mongoose');

const mongoRestaurantSchema = new mongoose.Schema({
    restaurantName: String,
    email: String,
    phoneNo: String,
    address: {
        houseNo: String,
        area: String,
        directions: String,
        city: String,
        location: {
            coordinates: [String]
        },
        gstinNo: String
    },
    menu: []

});

const RestaurantModel = mongoose.model('Restaurant', mongoRestaurantSchema);

module.exports = {
    RestaurantModel,
}
