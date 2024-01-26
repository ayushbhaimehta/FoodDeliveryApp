const Logger = require('../logger/logger');
const log = new Logger('DriverDao');
const { DriverModel } = require('../models/driverSchema/driver.schemaModel');
const { OrderModel } = require('../models/orderSchema/order.schemaModel');
const bcrypt = require('bcrypt');
const {
    driverExistsByPhone,
    driverExistsOnlyByPhone
} = require('../utils/userHelp');
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
                    "phoneNo": phoneNo,
                    "role": "Driver"
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

async function getAllOrdersDao(driverInfo, res) {
    const phoneNo = driverInfo;
    try {
        const driverDetails = await DriverModel.findOne({ phoneNo: phoneNo });
        if (!driverDetails) {
            log.info(`No drivers found with this phoneNo`);
            return res.status(404).send({
                message: 'No drivers found with this phoneNo'
            })
        }
        else {
            log.success(`Driver details found successfully`);
            return res.status(200).send({
                message: 'Driver details found!',
                result: driverDetails
            })
        }
    } catch (error) {
        log.error(`Cannot find any driver with phoneNo-${phoneNo} ${error}`);
        return res.status(500).send({
            message: 'error in finding driver'
        })
    }
}

async function addAssignOrderDao(driverInfo, res) {
    const driverId = driverInfo.assignedTo;
    const address = driverInfo.address;
    const orderDetails = driverInfo.orderDetails;
    const assignedTime = driverInfo.assignedTime;
    const status = driverInfo.status;
    const expectedTime = driverInfo.expectedTime;

    try {
        const response = await DriverModel.findById(driverId);
        console.log("aaa");
        if (!response) {
            log.error(`No drivers found with this driver id`);
            return res();
        }
        else {
            console.log({ response });
            const item = { address, orderDetails, assignedTime, status, expectedTime };
            console.log(item, "enddddd");
            response.assignedOrders.push(item);
            console.log(response.assignedOrders);
            try {
                await DriverModel.findOneAndUpdate({ _id: driverId },
                    {
                        assignedOrders: response.assignedOrders
                    });
                return res.send();
            } catch (error) {
                log.error(`Error in updated assigned order array ${error}`);
                return res();
            }
        }
    } catch (error) {
        log.error(`Error in finding any drivers ${error}`);
        return res();
    }
}

async function updateDriverInfoDao(driverInfo, res) {
    const phoneNo = driverInfo.phoneNo;
    let email, name, password;
    if (driverInfo.email) {
        email = driverInfo.email;
    }
    if (driverInfo.name) {
        name = driverInfo.name;
    }
    if (driverInfo.password) {
        password = driverInfo.password;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log({ phoneNo }, { email }, { name }, { password });
    try {
        const response = await DriverModel.findOneAndUpdate(
            { phoneNo: phoneNo },
            {
                email: email,
                name: name,
                password: hashedPassword
            },
            { new: true, useFindAndModify: false });
        log.success(`Successfully updated driver information`);
        return res.status(200).send({
            message: 'Successfully updated driver information',
            result: response
        });
    } catch (error) {
        log.error(`Error in finding and updating driver details ${error}`);
        return res.status(500).send({
            message: 'Error in updating driver details'
        })
    }
}

async function updateOrderStatusDao(driverInfo, res) {
    const phoneNo = driverInfo.phoneNo;
    const orderId = driverInfo.orderId;
    const newStatus = driverInfo.newStatus;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const newDelieveredTime = dateTime;

    try {
        const driverDetails = await driverExistsOnlyByPhone(phoneNo);
        const driverId = driverDetails._id;
        // if it is then lets see if it exists in orderDetails
        try {
            const orderInfo = await OrderModel.findById(orderId);
            // console.log({ orderInfo });
            if (!orderInfo) {
                log.error(`Cannot find an order with specified orderId`);
                return res.status(404).send({
                    message: 'Cannot find an order with this order ID'
                })
            }
            else {
                if (orderInfo.assignedTo == driverId) {
                    try {
                        await OrderModel.findOneAndUpdate(
                            { _id: orderId },
                            {
                                status: newStatus,
                                deliveredTime: newDelieveredTime
                            });
                        log.success(`Successfully updated order details`);
                        return res.status(200).send({
                            message: 'Successfully updated order status'
                        })
                    } catch (error) {
                        log.error(`Error in updating order details ${error}`);
                        return res.status(500).send({
                            message: 'Error in updating order detaisl'
                        })
                    }
                }
                else {
                    log.info('You are not authorized to update this order');
                    return res.status(403).send({
                        message: 'YOu are not authorized to update order whom you are not assigned to'
                    })
                }
            }
        } catch (error) {
            log.error(`Error in finding an order with ${orderId} ${error}`);
            return res.status(500).send({
                message: 'Error in finding order'
            })
        }
    } catch (error) {
        log.error(`Error in finding driver ${error}`);
        return res.status(500).send({
            message: 'Error in finding driver'
        })
    }
}

module.exports = {
    registerDriverDao,
    loginDriverDao,
    updateOrderStatusDao,
    getAllOrdersDao,
    updateDriverInfoDao,
    addAssignOrderDao
}