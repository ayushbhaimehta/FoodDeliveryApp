const express = require('express');
const {
    registerDriverController,
    loginDriverController,
    updateOrderStatusController,
    getAllOrdersController
} = require('../controllers/driverService/driver.controller');
const driverAuth = require('../middlewares/driverAuth');

const driverRouter = express.Router();

driverRouter.post('/registerDriver', registerDriverController);
driverRouter.post('/loginDriver', loginDriverController);

driverRouter.get('/getAllOrders/:phoneNo', getAllOrdersController); // only driver
// driverRouter.post('/updateDriverInfo', updateDriverInfoController); // update details only driver
driverRouter.post('/updateOrderStatus', driverAuth, updateOrderStatusController); // driver only

// map get live location

// driverRouter.post('/addAssignorder', addAssignorderController); // admin only

module.exports = driverRouter;