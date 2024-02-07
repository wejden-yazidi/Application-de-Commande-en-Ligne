/**
 * Module: orderController
 * Description: Handles HTTP requests related to order operations.
 */

// Importing required models
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

/**
 * @function createOrder
 * @async
 * @description Creates a new order based on user input.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the created order or an error message.
 */
const createOrder = async (req, res) => {
  try {
    // Extracting necessary data from the request body
    const { userId, products } = req.body;

    // Checking if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculating the total amount of the order
    const totalAmount = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Creating a new order in the database
    const newOrder = await Order.create({ UserId: userId, totalAmount });

    // Associating products with the order and specifying the quantity
    await newOrder.addProducts(products.map((product) => product.id), {
      through: { quantity: product.quantity },
    });

    // Sending a successful response with the created order
    res.status(201).json(newOrder);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function getAllOrders
 * @async
 * @description Retrieves all orders with details, including associated users and products.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the list of orders or an error message.
 */
const getAllOrders = async (req, res) => {
  try {
    // Retrieving all orders with associated user and product details
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Product, attributes: ['id', 'name', 'price'] },
      ],
    });

    // Sending the list of orders as a JSON response
    res.json(orders);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function getOrderDetails
 * @async
 * @description Retrieves specific details of an order based on the provided orderId.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the order details or an error message.
 */
const getOrderDetails = async (req, res) => {
  try {
    // Extracting the orderId from the request parameters
    const orderId = req.params.orderId;

    // Retrieving the order details with associated user and product details
    const order = await Order.findByPk(orderId, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Product, attributes: ['id', 'name', 'price'] },
      ],
    });

    // Checking if the order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Sending the order details as a JSON response
    res.json(order);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function updateOrderStatus
 * @async
 * @description Updates the status of a specific order based on the provided orderId.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated order or an error message.
 */
const updateOrderStatus = async (req, res) => {
  try {
    // Extracting the orderId and status from the request body
    const orderId = req.params.orderId;
    const { status } = req.body;

    // Retrieving the order based on orderId
    const order = await Order.findByPk(orderId);

    // Checking if the order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Updating the order status
    order.status = status;

    // Saving the changes to the database
    await order.save();

    // Sending the updated order as a JSON response
    res.json(order);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function deleteOrder
 * @async
 * @description Deletes a specific order based on the provided orderId.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response confirming the deletion or an error message.
 */
const deleteOrder = async (req, res) => {
  try {
    // Extracting the orderId from the request parameters
    const orderId = req.params.orderId;

    // Retrieving the order based on orderId
    const order = await Order.findByPk(orderId);

    // Checking if the order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Deleting the order from the database
    await order.destroy();

    // Sending a success message as a JSON response
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Exporting the controller functions for use in routes
module.exports = {
  createOrder,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  deleteOrder,
};
