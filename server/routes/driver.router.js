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
    verifyEmailOtpController
} = require('../controllers/driverService/driver.controller');
const driverAuth = require('../middlewares/driverAuth');

const driverRouter = express.Router();

driverRouter.post('/registerDriver', registerDriverController);
driverRouter.post('/loginDriver', loginDriverController);

driverRouter.post('/sendEmailOtp', sendEmailOtpController);
driverRouter.post('/verifyEmailOtp', verifyEmailOtpController);
driverRouter.post('/sendPhoneOtp', loginDriverController);
driverRouter.post('/verifyPhoneOtp', loginDriverController);

driverRouter.get('/getAllOrders', driverAuth, getAllOrdersController);
driverRouter.post('/updateDriverInfo', driverAuth, updateDriverInfoController);
driverRouter.post('/updateOrderStatus', driverAuth, updateOrderStatusController);

// chat feature through socket.io
driverRouter.post('/getLiveLoc', driverAuth, getLiveLocController)

driverRouter.post('/addAssignorder', addAssignOrderController); // admin only

module.exports = driverRouter;





