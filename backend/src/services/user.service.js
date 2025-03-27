const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (userData) => {
    const { username, email, password, name, address, phoneNumber, role } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        name,
        address,
        phoneNumber,
        role,
    });
    console.log("Saving user to database:", newUser);
    return await newUser.save();
};

// Get all users
const getAllUsers = async () => {
    return await User.find();
};

// Get a user by ID
const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

// Update a user
const updateUser = async (id, updateData) => {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

// Delete a user
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};