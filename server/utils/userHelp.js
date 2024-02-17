const { UserModel } = require('../models/userSchema/user.schemaModel');
const { RestaurantModel } = require('../models/restaurantSchema/restaurant.schemaModel');
const { DriverModel, DriverLocationModel } = require('../models/driverSchema/driver.schemaModel');

async function userExistsByPhone(phoneNo) {
    try {
        // const result = await UserModel.findOne({ phoneNo: phoneNo }).exec();
        const result = await UserModel.findOne({ phoneNo: phoneNo });
        return result;
    } catch (error) {
        // Handle any errors that occurred during the query
        console.error("Error in userExistsByPhone:", error);
        throw error; // Rethrow the error if needed
    }
}
async function driverExistsByPhone(phoneNo, email) {
    try {
        // const result = await UserModel.findOne({ phoneNo: phoneNo }).exec();
        const result = await DriverModel.findOne({ phoneNo: phoneNo, email: email });
        return result;
    } catch (error) {
        // Handle any errors that occurred during the query
        console.error("Error in userExistsByPhone:", error);
        throw error; // Rethrow the error if needed
    }
}
async function driverExistsOnlyByPhone(phoneNo) {
    try {
        // const result = await UserModel.findOne({ phoneNo: phoneNo }).exec();
        const result = await DriverModel.findOne({ phoneNo: phoneNo });
        return result;
    } catch (error) {
        // Handle any errors that occurred during the query
        console.error("Error in userExistsByPhone:", error);
        throw error; // Rethrow the error if needed
    }
}
async function restaurantExistsByPhone(phoneNo) {
    try {
        // const result = await UserModel.findOne({ phoneNo: phoneNo }).exec();
        const result = await RestaurantModel.findOne({ phoneNo: phoneNo });
        return result;
    } catch (error) {
        // Handle any errors that occurred during the query
        console.error("Error in restaurantExistsByPhone:", error);
        throw error; // Rethrow the error if needed
    }
}
async function getRestaurantById(restaurantId) {
    try {
        const result = await RestaurantModel.findById(restaurantId);
        return result;
    } catch (error) {
        // Handle any errors that occurred during the query
        console.error("Error in getRestaurantById: ", error);
        throw error; // Rethrow the error if needed
    }
}

async function driverLocationExists(_id) {
    try {
        const result = await DriverLocationModel.findOne({ driverId: _id });
        return result;
    } catch (error) {
        log.error('Something went wrong while fetching driverexisting location' + error);
        return res.status(400).send({
            message: 'Existing location retrieval error'
        });
    }
}

module.exports = {
    userExistsByPhone,
    restaurantExistsByPhone,
    getRestaurantById,
    driverExistsByPhone,
    driverExistsOnlyByPhone,
    driverLocationExists
};