const orderValidator = require('../../models/validation/order.validator.js');
const orderDao = require('../../dao/order.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('orderController');
const { isNotValidSchema } = require('../../utils/notValid.js');
const { UserModel } = require('../../models/userSchema/user.schemaModel.js');
const Razorpay = require('razorpay');
const crypto = require('crypto');

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

async function assignAlgoRequestController(req, res) {
    const orderInfo = req.body;
    let { error } = orderValidator.validateAssignAlgoRequestSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    orderInfo.phoneNo = req.phoneNo;
    const result = await orderDao.assignAlgoRequestDao(orderInfo, res);
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
    const amount = req.body.amount;
    try {
        const instance = new Razorpay({
            key_id: Key_Id,
            key_secret: Key_Secret,
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            return res.status(200).json({ data: order });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

async function paymentVerifyController(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
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

async function getForRestaurantController(req, res) {
    let orderInfo = req.params;
    let { error } = orderValidator.validategetForRestaurantSchema(orderInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await orderDao.getOrdersByRestaurantDao(orderInfo, res);
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
    paymentController,
    paymentVerifyController,
    getForRestaurantController,
    assignAlgoRequestController
};