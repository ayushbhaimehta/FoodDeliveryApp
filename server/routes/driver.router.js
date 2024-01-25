const express = require('express');
const {

} = require('../controllers/');
const userAuth = require('../middlewares/userAuth');

const orderRouter = express.Router();

// orderRouter.get('/getbyuserid/:phoneNo', getByUserIdController);
orderRouter.post('/addorder', userAuth, addOrderController);
// orderRouter.delete('/deleteorder', userAuth, deleteOrderController);

module.exports = orderRouter;