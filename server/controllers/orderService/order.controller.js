const orderValidator = require('../../models/validation/order.validator.js');
const orderDao = require('../../dao/order.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('orderController');
const { isNotValidSchema } = require('../../utils/notValid.js');
const { UserModel } = require('../../models/userSchema/user.schemaModel.js');

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
    assignOrdersController
};