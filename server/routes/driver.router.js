const express = require('express');
const {
    registerDriverController
} = require('../controllers/driverService/driver.controller');
// const userAuth = require('../middlewares/userAuth');

const driverRouter = express.Router();

// driverRouter.get('/getbyuserid/:phoneNo', getByUserIdController);
driverRouter.post('/registerDriver', registerDriverController);
// driverRouter.delete('/deleteorder', userAuth, deleteOrderController);

module.exports = driverRouter;