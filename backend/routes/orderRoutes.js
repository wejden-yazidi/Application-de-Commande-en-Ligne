const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Endpoint to create a new order
router.post('/orders', orderController.createOrder);

// Endpoint to get all orders with details
router.get('/orders', orderController.getAllOrders);

// Endpoint to get specific order details
router.get('/orders/:orderId', orderController.getOrderDetails);

// Endpoint to update an order status
router.put('/orders/:orderId', orderController.updateOrderStatus);

// Endpoint to delete an order
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
