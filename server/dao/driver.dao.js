const Logger = require('../logger/logger');
const log = new Logger('DriverDao');
const { DriverModel } = require('../models/driverSchema/driver.schemaModel');
const bcrypt = require('bcrypt');
const { userExistsByPhone, getRestaurantById, driverExistsByPhone } = require('../utils/userHelp');
const saltRounds = 12;
const jwt = require('jsonwebtoken');
const secretKey = "112233";

async function registerDriverDao(driverInfo, res) {
    const phoneNo = driverInfo.phoneNo;
    const email = driverInfo.email;
    let password = driverInfo.password;
    const name = driverInfo.name;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log({ password }, { hashedPassword });
    try {
        const driverExists = await driverExistsByPhone(phoneNo, email);
        if (driverExists) {
            log.error(`A driver already exists with phone No and email`);
            return res.status(400).send({
                message: 'A driver already exists with phone No and email'
            })
        }
        else {
            let newDriver = new DriverModel({
                phoneNo: phoneNo,
                email: email,
                name: name,
                password: hashedPassword,
                assignedOrders: []
            });
            try {
                await newDriver.save();
                log.success(`Successfully registered enw driver`);
                return res.status(200).send({
                    message: 'Successfully registered'
                })
            } catch (error) {
                log.error(`error while saving new constructor ${error}`);
                return res.status(404).send({
                    message: 'Error while registering new Driver'
                })
            }

        }
    } catch (error) {
        log.error(`error while searching driver details ${error}`);
        return res.status(404).send({
            message: 'Error while registering new Driver'
        })
    }
}

async function loginDriverDao(driverInfo, res) {
    const phoneNo = driverInfo.phoneNo;
    let password = driverInfo.password;
    try {
        const response = await DriverModel.findOne({
            phoneNo: phoneNo
        });
        let flag = bcrypt.compare(password, response.password);
        if (!flag) {
            return res.status(400).send({
                message: 'Wrong password entered'
            })
        }
        else {
            const jwtToken = jwt.sign(
                {
                    "phoneNo": phoneNo
                },
                secretKey,
                { expiresIn: "1d" }
            );
            res.header('auth', jwtToken);
            return res.status(200).send({
                message: 'Successfully logged In!'
            })
        }
    } catch (error) {
        log.error(`Error in finding drivers with specified details ${error}`);
        return res.status(404).send({
            message: 'error in finding drivers with specified details'
        })
    }
}

module.exports = {
    registerDriverDao,
    loginDriverDao
}