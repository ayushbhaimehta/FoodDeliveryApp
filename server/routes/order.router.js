const express = require('express');
const {
    addOrderController,
    deleteOrderController,
    getByUserIdController,
    assignOrdersController
} = require('../controllers/orderService/order.controller');
const userAuth = require('../middlewares/userAuth');

const orderRouter = express.Router();

orderRouter.get('/getbyuserid/:phoneNo', getByUserIdController);
orderRouter.post('/addorder', userAuth, addOrderController);
orderRouter.delete('/deleteorder', userAuth, deleteOrderController);

// admin allocation
orderRouter.post('/assignOrders', assignOrdersController)

module.exports = orderRouter;