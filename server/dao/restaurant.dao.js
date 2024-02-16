const Logger = require('../logger/logger');
const log = new Logger('Restaurant_Dao');
const { RestaurantModel } = require('../models/restaurantSchema/restaurant.schemaModel');
// const axios = require('axios');
const { restaurantExistsByPhone } = require('../utils/userHelp');

async function getByPhoneDao(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    try {
        const response = await RestaurantModel.findOne({ phoneNo: phoneNo, });
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

async function updateAddressDao(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    const oldAddress = loginInfo.oldAddress;
    let newAddress;
    if (loginInfo.newAddress) {
        newAddress = loginInfo.newAddress;
        try {
            const response = await RestaurantModel.findOneAndUpdate(
                { phoneNo: phoneNo, address: oldAddress },
                { address: newAddress }
            );
            if (!response) {
                res.status(400).send({
                    message: 'Add an address first to edit it'
                })
            }
            log.success('updated address scuccessfully!');
            return res.status(200).send({
                message: 'updated address successfully!'
            })

        } catch (error) {
            log.error(`Error in finding an address with specified details ${error}`);
            res.status(404).send({
                message: 'Error in finding an address with specified details'
            });
        }
    }
    else {
        try {
            await RestaurantModel.findOneAndUpdate({ phoneNo: phoneNo }, { address: oldAddress });
            log.success('updated address scuccessfully!');
            return res.status(200).send({
                message: 'Added address successfully!'
            })

        } catch (error) {
            log.error(`Error in finding an address with specified details ${error}`);
            res.status(404).send({
                message: 'Error in finding an address with specified details'
            });
        }
    }
}

async function updateNameDao(loginInfo, res) {
    const restaurantName = loginInfo.restaurantName;
    const email = loginInfo.email;
    const phoneNo = loginInfo.phoneNo;

    try {
        let response = await RestaurantModel.findOneAndUpdate(
            { phoneNo: phoneNo },
            { restaurantName: restaurantName, email: email });

        if (!response) {
            return res.status(400).send({
                message: 'Cannot find a user with phone No ' + phoneNo
            });
        } else {
            // console.log(response);
            response.restaurantName = restaurantName;
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

async function addImgDao(loginInfo, res) {
    const imgUrl = loginInfo.img;
    const phoneNo = loginInfo.phoneNo;
    try {
        await RestaurantModel.findOneAndUpdate(
            { phoneNo: phoneNo },
            { img: imgUrl });
        log.success(`Successfully added img url into the db`);
        return res.status(200).send({
            message: 'Successfully added img url to the db'
        })
    } catch (error) {
        log.error(`Error in updating img url ${error}`);
        return res.status(400).send({
            message: 'Error in adding imgUrl fo the restaurant'
        });
    }
}

async function addMenuDao(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    const menu = loginInfo.menu;

    try {
        const result = await restaurantExistsByPhone(phoneNo);
        if (!result) {
            return res.status(404).send({
                message: 'cannot find any details with specified phoneNo ' + phoneNo
            })
        }
        else {
            let menuArray = result.menu;
            for (let i = 0; i < menu.length; i++) {
                menuArray.push(menu[i]);
            }
            log.info(menuArray);
            log.info(menu);
            try {
                await RestaurantModel.findOneAndUpdate({ phoneNo: phoneNo }, { menu: menuArray })
                log.success('updated the menu!');
                return res.status(200).send({
                    message: 'Menu updated for phoneNo ' + phoneNo
                })
            } catch (error) {
                log.error(error);
                return res.status(500).send({
                    message: 'error in updating menu'
                })
            }
        }
    } catch (error) {
        log.error(error);
        return res.status(400).send({
            message: 'Cannot find any restaurant with specified details'
        })
    }
}

module.exports = {
    updateNameDao,
    updateAddressDao,
    getByPhoneDao,
    addMenuDao,
    addImgDao
}