const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Endpoint to get the content of the cart with product details
router.get('/cart', cartController.getCart);

// Endpoint to update the quantity of a product in the cart
router.put('/cart/:cartItemId', cartController.updateCartItemQuantity);

// Endpoint to delete a product from the cart
router.delete('/cart/:cartItemId', cartController.deleteCartItem);

        

module.exports = router;
