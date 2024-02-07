const Product = require('../models/Product');
const CartItem = require('../models/CartItem');

/**
 * @function getAllProducts
 * @async
 * @description Retrieves all products.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the list of products or an error message.
 */
const getAllProducts = async (req, res) => {
  try {
    // Retrieving all products from the database
    const products = await Product.findAll();

    // Sending the list of products as a JSON response
    res.json(products);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function addToCart
 * @async
 * @description Adds a product to the cart.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the new cart item or an error message.
 */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Retrieving the product based on productId
    const product = await Product.findByPk(productId);

    // Checking if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Checking if there's enough quantity available
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough quantity available' });
    }

    // Updating product quantity and saving changes
    product.quantity -= quantity;
    await product.save();

    // Creating a new cart item
    const cartItem = await CartItem.create({ ProductId: productId, quantity });

    // Sending the new cart item details as a JSON response
    res.json(cartItem);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function createProduct
 * @async
 * @description Creates a new product.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the new product or an error message.
 */
const createProduct = async (req, res) => {
  try {
    // Extracting name, price, and quantity from the request body
    const { name, price, quantity } = req.body;

    // Creating a new product
    const newProduct = await Product.create({ name, price, quantity });

    // Sending the new product details as a JSON response
    res.status(201).json(newProduct);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function getSingleProduct
 * @async
 * @description Retrieves a specific product by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the product details or an error message.
 */
const getSingleProduct = async (req, res) => {
  try {
    // Extracting productId from the request parameters
    const productId = req.params.productId;

    // Retrieving the product based on productId
    const product = await Product.findByPk(productId);

    // Checking if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Sending the product details as a JSON response
    res.json(product);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function updateProduct
 * @async
 * @description Updates a product.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated product or an error message.
 */
const updateProduct = async (req, res) => {
  try {
    // Extracting productId, name, price, and quantity from the request parameters and body
    const productId = req.params.productId;
    const { name, price, quantity } = req.body;

    // Retrieving the product based on productId
    const product = await Product.findByPk(productId);

    // Checking if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Updating the product details
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    // Saving the changes to the database
    await product.save();

    // Sending the updated product details as a JSON response
    res.json(product);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function deleteProduct
 * @async
 * @description Deletes a product.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response confirming the deletion or an error message.
 */
const deleteProduct = async (req, res) => {
  try {
    // Extracting productId from the request parameters
    const productId = req.params.productId;

    // Retrieving the product based on productId
    const product = await Product.findByPk(productId);

    // Checking if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Deleting the product from the database
    await product.destroy();

    // Sending a success message as a JSON response
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Exporting the controller functions for use in routes
module.exports = {
  getAllProducts,
  addToCart,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
