const mongoose = require('mongoose');

const mongoDriverSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    password: String,
    aadharId: String,
    panCard: String,
    bankDetails: String,
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

const mongoDriverEmailSchema = new mongoose.Schema({
    email: String,
    emailOtp: String
});

const mongoDriverLocationSchema = new mongoose.Schema({
    loc: {
        lat: String,
        long: String
    },
    driverId: String
});

const UserEmailModel = mongoose.model('Email', mongoDriverEmailSchema);
const DriverModel = mongoose.model('driver', mongoDriverSchema);
const DriverLocationModel = mongoose.model('Location', mongoDriverLocationSchema);

module.exports = {
    DriverModel,
    UserEmailModel,
    DriverLocationModel
}
