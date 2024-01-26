const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    updateNameController,
    addAddressController,
    updateAddressController,
    getByPhoneController,
    getUserLocationController
} = require('../controllers/userService/user.controller');
const userAuth = require('../middlewares/userAuth');

const userRouter = express.Router();

userRouter.get('/getbyphone/:phoneNo', userAuth, getByPhoneController);

userRouter.post('/sendotp', sendOtpController);
userRouter.post('/verifyOtp', verifyOtpController);
userRouter.post('/updateName', userAuth, updateNameController);
userRouter.post('/addaddress', userAuth, addAddressController);
userRouter.post('/updateAddress', userAuth, updateAddressController);

// map
userRouter.post('/getUserLocation', getUserLocationController);

module.exports = userRouter;