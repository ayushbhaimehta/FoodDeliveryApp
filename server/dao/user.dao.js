const Logger = require('../logger/logger');
const { RestaurantModel } = require('../models/restaurantSchema/restaurant.schemaModel');
const log = new Logger('User_Dao');
const { UserModel } = require('../models/userSchema/user.schemaModel');
// const axios = require('axios');

async function getByPhoneDao(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    try {
        const response = await UserModel.findOne({ phoneNo: phoneNo, });
        log.success('details ffound by phone no!');
        return res.status(200).send({
            message: 'details ffound by phone no!',
            result: response
        })

    } catch (error) {
        log.error(`Error in finding an user with specified details ${error}`);
        res.status(404).send({
            message: 'Error in finding an user with specified details'
        });
    }
}

async function getAllRestaurantsDao(addressInfo, res) {
    const address = addressInfo.city;
    try {
        const response = await RestaurantModel.find({ 'address.city': address });
        return res.status(200).send({
            message: 'Successfully fetched restaurant by locations',
            result: response
        })
    } catch (error) {
        log.error(`Error in fetching restaurants data in dao ${error}`);
        return res.status(500).send({
            message: 'Error in fetching restaurant details'
        });
    }
}

async function addAddressDao(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    const requestAddress = loginInfo.address;

    try {
        let response = await UserModel.findOne({ phoneNo: phoneNo });
        let addressArray = response.address;
        const index = addressArray.length;
        if (requestAddress.saveAs === 'Home') {
            for (let i = 0; i < index; i++) {
                if (response.address[i].saveAs === 'Home') {
                    return res.status(400).send({
                        message: 'Cannot set more than 1 Home'
                    })
                }
            }
        }

        if (index >= 5) {
            return res.status(400).send({
                message: `Cannot add more address for phoneNo ${phoneNo}`
            })
        }
        else {
            console.log({ addressArray });
            addressArray.push(requestAddress);
            log.info(addressArray);
            try {
                const result = await UserModel.findOneAndUpdate(
                    { phoneNo: phoneNo }, { address: addressArray }
                );
                log.success(`Successfully updated the address info`);
                return res.status(200).send({
                    message: 'Successfully updated the address details',
                    details: result
                })

            } catch (error) {
                log.error(' Error in updating address array ' + error);
                return res.status(500).send({
                    message: 'Error in updating address details'
                })
            }
        }
    } catch (error) {
        log.error('Error in finding data witht this phone No ' + error);
        return res.status(404).send({
            message: 'Cannot find details for this phone No'
        })
    }
}

async function updateAddressDao(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    const newAddress = loginInfo.newAddress;
    const oldAddress = loginInfo.oldAddress;

    try {
        await UserModel.findOneAndUpdate({
            phoneNo: phoneNo,
            'address': {
                $elemMatch: {
                    'myself': oldAddress.myself,
                    'saveAs': oldAddress.saveAs,
                    'houseNo': oldAddress.houseNo,
                    'area': oldAddress.area,
                    'directions': oldAddress.directions
                }
            }
        }, { 'address.$': newAddress });
        log.success('updated address scuccessfully!');
        return res.status(200).send({
            message: 'Updated address successfully!'
        })

    } catch (error) {
        log.error(`Error in finding an address with specified details ${error}`);
        res.status(404).send({
            message: 'Error in finding an address with specified details'
        });
    }

}

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
            response.name = name;
            response.email = email;
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
    updateNameDao,
    addAddressDao,
    updateAddressDao,
    getByPhoneDao,
    getAllRestaurantsDao
}