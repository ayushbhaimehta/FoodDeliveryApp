const express = require('express');
const {
    registerDriverController,
    loginDriverController
} = require('../controllers/driverService/driver.controller');
// const userAuth = require('../middlewares/userAuth');

const driverRouter = express.Router();

driverRouter.post('/registerDriver', registerDriverController);
driverRouter.post('/loginDriver', loginDriverController);

// driverRouter.get('/getAllOrders/:phoneNo', getAllOrdersController); // only driver
// driverRouter.post('/updateDriverInfo', updateDriverInfoController); // update details only driver
// driverRouter.post('/updateOrderStatus', updateOrderStatusController); // driver only

// map get live location

// driverRouter.post('/addAssignorder', addAssignorderController); // admin only

module.exports = driverRouter;