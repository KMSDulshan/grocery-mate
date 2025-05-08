const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// Route to create a new user
router.post("/users", userController.createUser);

// Route to get all users
router.get("/users", userController.getAllUsers);

// Route to get a user by ID
router.get("/users/:id", userController.getUserById);

// Route to update a user
router.put("/users/:id", userController.updateUser);

// Route to delete a user
router.delete("/users/:id", userController.deleteUser);

// Route to login a user
router.post("/login", userController.loginUser);

module.exports = router;