const { UserModel } = require('../models/userSchema/user.schemaModel');

async function userExistsByPhone(phoneNo) {
    try {
        // const result = await UserModel.findOne({ phoneNo: phoneNo }).exec();
        const result = await UserModel.findOne({ phoneNo: phoneNo });
        return result;
    } catch (err) {
        // Handle any errors that occurred during the query
        console.error("Error in userExistsByPhone:", err);
        throw err; // Rethrow the error if needed
    }
}

module.exports = {
    userExistsByPhone
};