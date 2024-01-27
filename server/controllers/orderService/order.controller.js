const orderValidator = require('../../models/validation/order.validator.js');
const orderDao = require('../../dao/order.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('orderController');
const { isNotValidSchema } = require('../../utils/notValid.js');
const { UserModel } = require('../../models/userSchema/user.schemaModel.js');
const Razorpay = require('razorpay');

async function addOrderController(req, res) {
    let orderInfo = req.body;
    let { error } = orderValidator.validateAddOrderSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    orderInfo.phoneNo = req.phoneNo;
    const result = await orderDao.addOrderDao(orderInfo, res);
    return result;
}

async function assignOrdersController(req, res) {
    const orderInfo = req.body;
    let { error } = orderValidator.validateAssignOrderSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    orderInfo.phoneNo = req.phoneNo;
    const result = await orderDao.assignOrderDao(orderInfo, res);
    return result;
}

async function paymentController(req, res) {
    let orderInfo = req.body;
    // let { error } = orderValidator.validateAddOrderSchema(orderInfo);
    // if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const phoneNo = req.phoneNo;
    const Key_Id = process.env.Key_Id;
    const Key_Secret = process.env.Key_Secret;
    const razorpay = new Razorpay({
        key_id: Key_Id,
        key_secret: Key_Secret,
    });
    const options = {
        amount: 50000,
        currency: 'INR',
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    // instance.orders.create({
    //     amount: 50000,
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //         key1: "value3",
    //         key2: "value2"
    //     }
    // })
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
        res.status(400).send('Not able to create order. Please try again!');
    }
}

async function getByUserIdController(req, res) {
    let orderInfo = req.params;
    let { error } = orderValidator.validateGetOrderSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const response = await UserModel.findOne({
        phoneNo: orderInfo.phoneNo
    })
    orderInfo.userId = response._id;
    const result = await orderDao.getOrderDao(orderInfo, res);
    return result;
}

async function deleteOrderController(req, res) {
    let orderInfo = req.body;
    let { error } = orderValidator.validateDeleteOrderSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    orderInfo.phoneNo = req.phoneNo;
    const result = await orderDao.deleteOrderDao(orderInfo, res);
    return result;
}

module.exports = {
    addOrderController,
    deleteOrderController,
    getByUserIdController,
    assignOrdersController,
    paymentController
};