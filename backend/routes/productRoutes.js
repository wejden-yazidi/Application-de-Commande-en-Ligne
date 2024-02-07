const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/products', productController.getAllProducts);

// Add a product to cart
router.post('/add-to-cart', productController.addToCart);

// Create a new product
router.post('/products', productController.createProduct);

// Get a single product
router.get('/products/:productId', productController.getSingleProduct);

// Update a product
router.put('/products/:productId', productController.updateProduct);

// Delete a product
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
