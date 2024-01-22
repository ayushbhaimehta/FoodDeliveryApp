const Logger = require('../logger/logger');
const log = new Logger('User_Dao');
const { UserModel } = require('../models/userSchema/user.schemaModel');
// const axios = require('axios');

async function updateNameDao(loginInfo, res) {
    const name = loginInfo.name;
    const email = loginInfo.email;
    const phoneNo = loginInfo.phoneNo;

    try {
        let response = await UserModel.findOneAndUpdate(
            { phoneNo: phoneNo },
            { name: name, email: email });

        if (!response) {
            return res.status(400).send({
                message: 'Cannot find a user with phone No ' + phoneNo
            });
        } else {
            // console.log(response);
            response.name = name
            return res.status(200).send({
                message: 'Successfully updated name and email',
                result: response
            });
        }
    } catch (err) {
        // log.error('Error updating user:', err);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    updateNameDao
}