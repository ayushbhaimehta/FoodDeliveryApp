const mongoose = require('mongoose');

const mongoDriverSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    password: String,
    assignedOrders: [
        {
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
            assignedTime: String,
            status: String,
            expectedTime: String
        }
    ]
});

const DriverModel = mongoose.model('driver', mongoDriverSchema);

module.exports = {
    DriverModel,
}
