const express = require('express');
const {
    addOrderController
} = require('../controllers/orderService/order.controller');
const userAuth = require('../middlewares/userAuth');

const orderRouter = express.Router();

// restaurantRouter.get('/getbyphone/:phoneNo', restaurantAuth, getByPhoneController);

orderRouter.post('/addorder', userAuth, addOrderController);

module.exports = orderRouter;