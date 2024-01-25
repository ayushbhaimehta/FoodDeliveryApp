const mongoose = require('mongoose');

const mongoOrderSchema = new mongoose.Schema({
    userId: String,
    address: {
        name: String,
        phoneNo: String,
        myself: Boolean,
        saveAs: String,
        houseNo: String,
        area: String,
        directions: String,
        location: {
            coordinates: [String]
        }
    },
    orderDetails: {
        restaurantId: String,
        cart: [{
            item: {
                dish: String,
                quantity: String,
                itemCost: String,
            }
        }],
        totalCost: String
    },
    assignedTo: String,
    assignedTime: String,
    status: String,
    expectedTime: String,
    deliveredTime: String
});

const OrderModel = mongoose.model('Order', mongoOrderSchema);

module.exports = {
    OrderModel,
}
