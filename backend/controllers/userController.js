/**
 * Module: userController
 * Description: Handles HTTP requests related to user operations.
 */

// Importing required models and dependencies
const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * @function createUser
 * @async
 * @description Creates a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the new user or an error message.
 */
const createUser = async (req, res) => {
  try {
    // Extracting username and password from the request body
    const { username, password } = req.body;

    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user with the hashed password
    const newUser = await User.create({ username, password: hashedPassword });

    // Sending the new user details as a JSON response
    res.status(201).json(newUser);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function getAllUsers
 * @async
 * @description Retrieves all users (for admin purposes).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the list of users or an error message.
 */
const getAllUsers = async (req, res) => {
  try {
    // Retrieving all users from the database
    const users = await User.findAll();

    // Sending the list of users as a JSON response
    res.json(users);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function getUserById
 * @async
 * @description Retrieves a specific user by ID (usually for user profile).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the user details or an error message.
 */
const getUserById = async (req, res) => {
  try {
    // Extracting userId from the request parameters
    const userId = req.params.userId;

    // Retrieving the user based on userId
    const user = await User.findByPk(userId);

    // Checking if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Sending the user details as a JSON response
    res.json(user);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function updateUser
 * @async
 * @description Updates a user (usually for user profile).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated user or an error message.
 */
const updateUser = async (req, res) => {
  try {
    // Extracting userId, username, and password from the request parameters and body
    const userId = req.params.userId;
    const { username, password } = req.body;

    // Retrieving the user based on userId
    const user = await User.findByPk(userId);

    // Checking if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hashing the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Updating the user details with the hashed password
    user.username = username;
    user.password = hashedPassword;

    // Saving the changes to the database
    await user.save();

    // Sending the updated user details as a JSON response
    res.json(user);
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @function deleteUser
 * @async
 * @description Deletes a user (usually for account deletion).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response confirming the deletion or an error message.
 */
const deleteUser = async (req, res) => {
  try {
    // Extracting userId from the request parameters
    const userId = req.params.userId;

    // Retrieving the user based on userId
    const user = await User.findByPk(userId);

    // Checking if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Deleting the user from the database
    await user.destroy();

    // Sending a success message as a JSON response
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Exporting the controller functions for use in routes
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
