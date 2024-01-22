const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    updateNameController,
    addAddressController
} = require('../controllers/userService/user.controller');
const userAuth = require('../middlewares/userAuth');


const userRouter = express.Router();

userRouter.post('/sendotp', sendOtpController);
userRouter.post('/verifyOtp', verifyOtpController);
userRouter.post('/updateName', userAuth, updateNameController);
userRouter.post('/addaddress', userAuth, addAddressController);

module.exports = userRouter;