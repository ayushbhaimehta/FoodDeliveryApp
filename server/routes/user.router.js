const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    updateNameController,
    addAddressController,
    updateAddressController,
    getByPhoneController,
    getUserLocationController,
    getAllRestaurantsController,
    getNearbyRestaurantsController
} = require('../controllers/userService/user.controller');
const userAuth = require('../middlewares/userAuth');

const userRouter = express.Router();

userRouter.get('/getbyphone/:phoneNo', userAuth, getByPhoneController);

userRouter.post('/sendotp', sendOtpController);
userRouter.post('/verifyOtp', verifyOtpController);
userRouter.post('/updateName', userAuth, updateNameController);
userRouter.post('/addaddress', userAuth, addAddressController);
userRouter.post('/updateAddress', userAuth, updateAddressController);

// get all restaurant
userRouter.post('/getAllRestaurants', getAllRestaurantsController);
userRouter.post('/getNearbyRestaurants', getNearbyRestaurantsController);

// map
// userRouter.post('/getUserLocation', getUserLocationController);

module.exports = userRouter;