const express = require('express');
const {
    addOrderController,
    deleteOrderController,
    getByUserIdController,
    assignOrdersController,
    paymentController,
    paymentVerifyController,
    getForRestaurantController,
    checkPendingOrdersController
} = require('../controllers/orderService/order.controller');
const userAuth = require('../middlewares/userAuth');
const driverAuth = require('../middlewares/driverAuth');

const orderRouter = express.Router();

orderRouter.get('/getbyuserid/:phoneNo', getByUserIdController);
orderRouter.post('/addorder', userAuth, addOrderController);
orderRouter.delete('/deleteorder', userAuth, deleteOrderController);

// restaurant get for one restaurant
orderRouter.get('/getForRestaurant/:restaurantId', getForRestaurantController)

// payment gateway
orderRouter.post('/paymentCreateOrder', userAuth, paymentController);
orderRouter.post('/paymentVerify', userAuth, paymentVerifyController);

// admin allocation
orderRouter.post('/assignOrders', assignOrdersController);

// driver only
orderRouter.get('/checkPendingOrders/:city', driverAuth, checkPendingOrdersController);

module.exports = orderRouter;