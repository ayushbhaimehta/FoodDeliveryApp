const driverValidator = require('../../models/validation/driver.validator.js');
const driverDao = require('../../dao/driver.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('driverController');
const { isNotValidSchema } = require('../../utils/notValid.js');

async function registerDriverController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateRegisterDriverSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await driverDao.registerDriverDao(driverInfo, res);
    return result;
}

async function loginDriverController(req, res) {
    const driverInfo = req.body;
    let { error } = driverValidator.validateLoginDriverSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await orderDao.loginDriverDao(driverInfo, res);
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
    registerDriverController,
    loginDriverController
};