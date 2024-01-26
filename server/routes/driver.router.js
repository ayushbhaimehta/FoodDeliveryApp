const express = require('express');
const {
    registerDriverController,
    loginDriverController,
    updateOrderStatusController,
    getAllOrdersController,
    updateDriverInfoController,
    addAssignOrderController
} = require('../controllers/driverService/driver.controller');
const driverAuth = require('../middlewares/driverAuth');

const driverRouter = express.Router();

driverRouter.post('/registerDriver', registerDriverController);
driverRouter.post('/loginDriver', loginDriverController);

driverRouter.get('/getAllOrders', driverAuth, getAllOrdersController);
driverRouter.post('/updateDriverInfo', driverAuth, updateDriverInfoController);
driverRouter.post('/updateOrderStatus', driverAuth, updateOrderStatusController);

// map get live location socketIo

driverRouter.post('/addAssignorder', addAssignOrderController); // admin only

module.exports = driverRouter;