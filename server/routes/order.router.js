const express = require('express');
const {
    addOrderController,
    deleteOrderController,
    getByUserIdController,
    assignOrdersController,
    paymentController,
    paymentVerifyController,
    getForRestaurantController,
    assignAlgoRequestController
} = require('../controllers/orderService/order.controller');
const userAuth = require('../middlewares/userAuth');

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
orderRouter.post('/assignAlgoRequest', assignAlgoRequestController);

module.exports = orderRouter;