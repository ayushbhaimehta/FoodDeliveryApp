const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    getByPhoneController,
    updateNameController,
    updateAddressController,
    addMenuController
} = require('../controllers/restaurantService/restaurant.controller');
const restaurantAuth = require('../middlewares/restaurantAuth');

const restaurantRouter = express.Router();

restaurantRouter.get('/getbyphone/:phoneNo', restaurantAuth, getByPhoneController);

restaurantRouter.post('/sendotp', sendOtpController);
restaurantRouter.post('/verifyOtp', verifyOtpController);
restaurantRouter.post('/updateName', restaurantAuth, updateNameController);
restaurantRouter.post('/updateAddress', restaurantAuth, updateAddressController);
restaurantRouter.post('/addMenu', restaurantAuth, addMenuController);

module.exports = restaurantRouter;