const Logger = require('../logger/logger');
const log = new Logger('Order_Dao');
const { OrderModel } = require('../models/orderSchema/order.schemaModel');
const {
    userExistsByPhone,
    getRestaurantById,
    getOrderDetailsById,
} = require('../utils/userHelp');
const { getDistanceFromLatLonInKm } = require('../utils/distanceAlgo');
const axios = require('axios');

async function getOrderDao(orderInfo, res) {
    // const phoneNo = orderInfo.phoneNo;
    const userId = orderInfo.userId
    try {
        const response = await OrderModel.find({ userId: userId, });
        log.success('details ffound by userId!');
        return res.status(200).send({
            message: 'details ffound by userId!',
            result: response
        })

    } catch (error) {
        log.error(`Error in finding an user with specified details ${error}`);
        res.status(404).send({
            message: 'Error in finding an user with specified details'
        });
    }
}

async function getOrdersByRestaurantDao(orderInfo, res) {
    const restaurantId = orderInfo.restaurantId;
    try {
        const response = await OrderModel.find({ 'orderDetails.restaurantId': restaurantId });
        console.log({ response });
        return res.status(200).send({
            message: 'details found by restaurantId!',
            result: response
        })
    } catch (error) {
        log.error(`Error in finding orders for this restaurant ${error}`);
        res.status(404).send({
            message: 'Error in finding orders for this restaurant'
        });
    }
}

async function deleteOrderDao(orderInfo, res) {
    const phoneNo = orderInfo.phoneNo;
    const orderId = orderInfo.orderId;
    try {
        await OrderModel.findByIdAndDelete(orderId);
        log.success('Successfully deleted the order');
        return res.status(200).send({
            message: 'Successfully ordered!'
        })
    } catch (error) {
        log.error('error in deleting order from the db! ' + error);
        return res.status(400).send({
            message: 'error in deleting order'
        })
    }
}

async function addOrderDao(orderInfo, res) {
    const phoneNo = orderInfo.phoneNo;
    const address = orderInfo.address;
    let orderDetails = orderInfo.orderDetails;
    try {
        const userInfo = await userExistsByPhone(phoneNo);
        // check whether this address exits in his address array
        log.success('Get user Done');
        let flag = false;
        for (let i = 0; i < userInfo.address.length; i++) {
            // console.log(userInfo.address[i], " AA");
            if (userInfo.address[i].name == address.name &&
                userInfo.address[i].phoneNo == address.phoneNo &&
                userInfo.address[i].myself == address.myself &&
                userInfo.address[i].saveAs == address.saveAs &&
                userInfo.address[i].houseNo == address.houseNo &&
                userInfo.address[i].area == address.area &&
                userInfo.address[i].directions == address.directions &&
                userInfo.address[i].location.coordinates[0] == address.location.coordinates[0] &&
                userInfo.address[i].location.coordinates[1] == address.location.coordinates[1]
            ) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            log.error(`Cannot find a matchinng address for the user ${userInfo.name} ${userInfo.phoneNo}`)
            return res.status(400).send({
                message: 'Cannot find a matching address for this user'
            })
        } else {
            log.success('addres verification done');
            try {
                const restaurantDetails = await getRestaurantById(orderDetails.restaurantId);
                let finalCost = 0;
                for (let j = 0; j < orderDetails.cart.length; j++) {
                    // let itemPrice = restaurantDetails.menu
                    // if dish exists
                    let dishCheck = false;
                    let Cost = 0;
                    for (let k = 0; k < restaurantDetails.menu.length; k++) {
                        // console.log(restaurantDetails.menu[k].name);
                        // console.log(orderDetails.cart[j].item.dish);
                        if (restaurantDetails.menu[k].name == orderDetails.cart[j].item.dish) {
                            dishCheck = true;
                            Cost = restaurantDetails.menu[k].price;
                            console.log(Cost, "before calculation");
                        }
                    }
                    if (!dishCheck) {
                        log.info('Cannot find the desired dish in this restaurant');
                        return res.status(400).send({
                            message: 'Cannot find this dish in this restaurant'
                        });
                    } else {
                        log.info('dish verification done');
                        let a = parseInt(orderDetails.cart[j].item.quantity);
                        let b = parseInt(Cost);
                        console.log({ a }, { b });
                        orderDetails.cart[j].item.itemCost = (a * b).toString();
                        finalCost += (a * b);
                    }
                }
                orderDetails.totalCost = (finalCost).toString();
                log.info(orderDetails);
                console.log(orderDetails);
                let newOrder = new OrderModel({
                    userId: userInfo._id,
                    address: address,
                    orderDetails: orderDetails,
                    assignedTo: '',
                    assignedTime: '',
                    status: 'pending',
                    expectedTime: '',
                    deliveredTime: ''
                });
                // save it in db
                try {
                    await newOrder.save();
                    log.success('Successfully saved new order in the db');
                    return res.status(200).send({
                        message: 'New order added to the db!',
                    });
                } catch (error) {
                    log.error(`Error in saving new order to the db for ${phoneNo} ` + error);
                    return res.status(400).send({
                        message: 'Error ins aving new order to the DB!'
                    })
                }
            } catch (error) {
                log.error(`Error in fetching details of given restaurant ${error}`);
                return res.status(400).send({
                    message: 'Error in finding restaurant'
                })
            }
        }
    } catch (error) {
        log.error(`Error in fetching info with phone No ${phoneNo} ${error}`);
        res.status(404).send({
            message: 'Error in finding user details'
        })
    }
}

async function assignOrderDao(orderInfo, res) {
    const _id = orderInfo._id;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log({ dateTime });
    try {
        let response;
        if (orderInfo.deliveredTime) {
            response = await OrderModel.findByIdAndUpdate(_id,
                {
                    assignedTo: orderInfo.assignedTo,
                    assignedTime: dateTime.toString(),
                    status: orderInfo.status,
                    expectedTime: orderInfo.expectedTime,
                    deliveredTime: orderInfo.deliveredTime
                },
                { new: true, useFindAndModify: false });
        }
        else {
            response = await OrderModel.findByIdAndUpdate(_id,
                {
                    assignedTo: orderInfo.assignedTo,
                    assignedTime: dateTime.toString(),
                    status: orderInfo.status,
                    expectedTime: orderInfo.expectedTime,
                },
                { new: true, useFindAndModify: false });
        }
        console.log({ response });
        log.success(`Successfully updated orderInfo`);
        const address = response.address;
        const orderDetails = response.orderDetails
        const assignedTo = response.assignedTo
        const assignedTime = response.assignedTime
        const status = response.status
        const expectedTime = response.expectedTime

        // call add assign in driver array
        await axios({
            method: 'post',
            url: 'http://localhost:3000/driver/addAssignorder',
            data: {
                address,
                orderDetails,
                assignedTo,
                assignedTime,
                status,
                expectedTime
            }
        })
        return res.status(200).send({
            message: 'orderinfo Updated!',
            result: response
        })
    } catch (error) {
        log.error(`Error in finding an user with specified details ${error}`);
        res.status(404).send({
            message: 'Error in finding an user with specified details'
        });
    }
}

module.exports = {
    addOrderDao,
    getOrderDao,
    deleteOrderDao,
    assignOrderDao,
    getOrdersByRestaurantDao
}