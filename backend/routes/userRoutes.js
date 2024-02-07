const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Endpoint to create a new user
router.post("/users", userController.createUser);

// Endpoint to get all users (for admin purposes)
router.get("/users", userController.getAllUsers);

// Endpoint to get a specific user by ID (usually for user profile)
router.get("/users/:userId", userController.getUserById);

// Endpoint to update a user (usually for user profile)
router.put("/users/:userId", userController.updateUser);

// Endpoint to delete a user (usually for account deletion)
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
