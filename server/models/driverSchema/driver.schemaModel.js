const mongoose = require('mongoose');

const mongoDriverSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    password: String,
    assignedOrders: [String]
});

const DriverModel = mongoose.model('driver', mongoDriverSchema);

module.exports = {
    DriverModel,
}
