const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    updateNameController,
    addAddressController,
    updateAddressController
} = require('../controllers/userService/user.controller');
const userAuth = require('../middlewares/userAuth');


const userRouter = express.Router();

userRouter.post('/sendotp', sendOtpController);
userRouter.post('/verifyOtp', verifyOtpController);
userRouter.post('/updateName', userAuth, updateNameController);
userRouter.post('/addaddress', userAuth, addAddressController);
userRouter.post('/updateAddress', userAuth, updateAddressController);

module.exports = userRouter;