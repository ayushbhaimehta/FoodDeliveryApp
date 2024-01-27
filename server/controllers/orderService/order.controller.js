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
    let { error } = orderValidator.validateAddOrderSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const phoneNo = req.phoneNo;
    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })
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