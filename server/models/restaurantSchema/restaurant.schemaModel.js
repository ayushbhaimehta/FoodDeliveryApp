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
    menu: [
        {
            img: {
                data: Buffer,
                contentType: String,
            },
            name: String,
            price: String,
            description: String,
            rating: String
        }
    ]

});

const RestaurantModel = mongoose.model('Restaurant', mongoRestaurantSchema);

module.exports = {
    RestaurantModel,
}
