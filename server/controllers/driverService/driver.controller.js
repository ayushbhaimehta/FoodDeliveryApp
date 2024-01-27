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
    const result = await driverDao.loginDriverDao(driverInfo, res);
    return result;
}

async function addAssignOrderController(req, res) {
    const driverInfo = req.body;
    const result = await driverDao.addAssignOrderDao(driverInfo, res);
    return result;
}

async function updateDriverInfoController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateupdateDriverInfoSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    driverInfo.phoneNo = req.phoneNo;
    const result = await driverDao.updateDriverInfoDao(driverInfo, res);
    return result;
}

async function updateOrderStatusController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateUpdateOrderStatusSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    driverInfo.phoneNo = req.phoneNo;
    const result = await driverDao.updateOrderStatusDao(driverInfo, res);
    return result;
}

async function getAllOrdersController(req, res) {
    let driverInfo = req.phoneNo;
    log.success('Schema Validation done');
    const result = await driverDao.getAllOrdersDao(driverInfo, res);
    return result;
}

module.exports = {
    registerDriverController,
    loginDriverController,
    updateOrderStatusController,
    getAllOrdersController,
    updateDriverInfoController,
    addAssignOrderController
};