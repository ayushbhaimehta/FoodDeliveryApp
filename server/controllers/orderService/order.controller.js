const orderValidator = require('../../models/validation/order.validator.js');
const orderDao = require('../../dao/order.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('orderController');
const { isNotValidSchema } = require('../../utils/notValid.js');

async function getByPhoneController(req, res) {
    let loginInfo = req.params;
    let { error } = restaurantValidator.validateGetByPhoneNoSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await restaurantDao.getByPhoneDao(loginInfo, res);
    return result;
}

async function addOrderController(req, res) {
    let orderInfo = req.body;
    let { error } = orderValidator.validateAddOrderSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    orderInfo.phoneNo = req.phoneNo;
    const result = await orderDao.addOrderDao(orderInfo, res);
    return result;
}

module.exports = {
    addOrderController
};