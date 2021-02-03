const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/', orderController.show);

router.get('/add', orderController.showOrderAddForm);
router.get('/edit/:orderId', orderController.showEditForm);
router.get('/details/:orderId', orderController.showDetails);
router.get('/delete/:orderId', orderController.deleteOrder)

router.post('/add', orderController.addOrder);
router.post('/edit', orderController.updateOrder);

module.exports = router;