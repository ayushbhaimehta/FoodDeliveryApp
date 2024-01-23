const { UserModel } = require('../models/userSchema/user.schemaModel');
const { RestaurantModel } = require('../models/restaurantSchema/restaurant.schemaModel');

async function userExistsByPhone(phoneNo) {
    try {
        // const result = await UserModel.findOne({ phoneNo: phoneNo }).exec();
        const result = await UserModel.findOne({ phoneNo: phoneNo });
        return result;
    } catch (error) {
        // Handle any errors that occurred during the query
        console.error("Error in userExistsByPhone:", err);
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
        console.error("Error in userExistsByPhone:", err);
        throw error; // Rethrow the error if needed
    }
}

module.exports = {
    userExistsByPhone,
    restaurantExistsByPhone
};