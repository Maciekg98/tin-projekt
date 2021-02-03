
const express = require('express');
const router = express.Router();

const orderApiController = require('../../api/OrderApi');


router.get('/', orderApiController.getOrder);
router.get('/:orderId', orderApiController.getOrderById);
router.post('/', orderApiController.createOrder);
router.put('/:orderId', orderApiController.updateOrder);
router.delete('/:orderId', orderApiController.deleteOrder);





module.exports = router;

