const express = require('express');
const {
    addOrderController,
    deleteOrderController,
    getByUserIdController
} = require('../controllers/orderService/order.controller');
const userAuth = require('../middlewares/userAuth');

const orderRouter = express.Router();

orderRouter.get('/getbyuserid/:phoneNo', getByUserIdController);
orderRouter.post('/addorder', userAuth, addOrderController);
orderRouter.delete('/deleteorder', userAuth, deleteOrderController);

module.exports = orderRouter;