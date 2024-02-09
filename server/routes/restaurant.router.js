const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    getByPhoneController,
    updateNameController,
    updateAddressController,
    addMenuController,
    Testing,
    tester
} = require('../controllers/restaurantService/restaurant.controller');
const restaurantAuth = require('../middlewares/restaurantAuth');

const restaurantRouter = express.Router();

restaurantRouter.get('/getbyphone/:phoneNo', restaurantAuth, getByPhoneController);

restaurantRouter.post('/sendotp', sendOtpController);
restaurantRouter.post('/verifyOtp', verifyOtpController);
restaurantRouter.post('/updateName', restaurantAuth, updateNameController);
restaurantRouter.post('/updateAddress', restaurantAuth, updateAddressController);
restaurantRouter.post('/addMenu', restaurantAuth, addMenuController);
restaurantRouter.post('/testing', Testing);
restaurantRouter.post('/tester', tester);

module.exports = restaurantRouter;