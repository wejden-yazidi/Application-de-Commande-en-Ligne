/**
 * Module: cartController
 * Description: Handles HTTP requests related to cart operations.
 */

// Importing required models
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

/**
 * @function getCart
 * @async
 * @description Retrieves the content of the cart with details of the products.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the cart items or an error message.
 */
const getCart = async (req, res) => {
  try {
    // Retrieving all cart items with associated product details
    const cartItems = await CartItem.findAll({
      include: [{ model: Product, attributes: ['id', 'name', 'price','quantity'] }],
    });

    // Sending the list of cart items as a JSON response
    res.json(cartItems);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function updateCartItemQuantity
 * @async
 * @description Modifies the quantity of a product in the cart.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated cart item or an error message.
 */
const updateCartItemQuantity = async (req, res) => {
  try {
    // Extracting cartItemId and quantity from the request parameters and body
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    // Retrieving the cart item based on cartItemId
    const cartItem = await CartItem.findByPk(cartItemId);

    // Checking if the cart item exists
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Updating the cart item quantity
    cartItem.quantity = quantity;

    // Saving the changes to the database
    await cartItem.save();

    // Sending the updated cart item as a JSON response
    res.json(cartItem);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function deleteCartItem
 * @async
 * @description Deletes a product from the cart.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response confirming the deletion or an error message.
 */
const deleteCartItem = async (req, res) => {
  try {
    // Extracting cartItemId from the request parameters
    const cartItemId = req.params.cartItemId;

    // Retrieving the cart item based on cartItemId
    const cartItem = await CartItem.findByPk(cartItemId);

    // Checking if the cart item exists
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Deleting the cart item from the database
    await cartItem.destroy();

    // Sending a success message as a JSON response
    res.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Exporting the controller functions for use in routes
module.exports = {
  getCart,
  updateCartItemQuantity,
  deleteCartItem,
};
