const express = require('express');
const {
    registerDriverController,
    loginDriverController,
    updateOrderStatusController,
    getAllOrdersController,
    updateDriverInfoController,
    addAssignOrderController,
    getLiveLocController,
    sendEmailOtpController,
    verifyEmailOtpController,
    sendPhoneOtpController,
    verifyPhoneOtpController,
    arrayOfAvailableDrivers,
    assignAlgoRequestController,
    finishOrderController
} = require('../controllers/driverService/driver.controller');
const driverAuth = require('../middlewares/driverAuth');

const driverRouter = express.Router();

driverRouter.post('/registerDriver', registerDriverController);
driverRouter.post('/loginDriver', loginDriverController);

driverRouter.post('/sendEmailOtp', sendEmailOtpController);
driverRouter.post('/verifyEmailOtp', verifyEmailOtpController);
driverRouter.post('/sendPhoneOtp', sendPhoneOtpController);
driverRouter.post('/verifyPhoneOtp', verifyPhoneOtpController);

driverRouter.get('/getAllOrders', driverAuth, getAllOrdersController);
driverRouter.post('/updateDriverInfo', driverAuth, updateDriverInfoController);
driverRouter.post('/updateOrderStatus', driverAuth, updateOrderStatusController);

// chat feature through socket.io
driverRouter.post('/getLiveLoc', driverAuth, getLiveLocController);
driverRouter.get('/arrayOfAvailableDrivers', arrayOfAvailableDrivers);// get availableDriverLocation

driverRouter.post('/addAssignorder', addAssignOrderController); // admin only

driverRouter.post('/assignAlgoRequest', driverAuth, assignAlgoRequestController);
// driverRouter.post('/assignAlgoBool', driverAuth, assignAlgoBoolController);
driverRouter.post('/finishOrder', driverAuth, finishOrderController);

module.exports = driverRouter;





