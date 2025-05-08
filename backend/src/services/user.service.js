const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (userData) => {
    const { username, email, password, name, address, phoneNumber, role } = userData;

    // Validate required fields
    if (!username) {
        throw new Error("Username is required");
    }
    if (!email) {
        throw new Error("Email is required");
    }
    if (!password) {
        throw new Error("Password is required");
    }

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
        address, // Save address
        phoneNumber, // Save phone number
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
    const { username, email, name, phoneNumber, address } = updateData;

    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }

    if (username) {
        user.username = username;
    }
    if (email) {
        user.email = email;
    }
    if (name) {
        user.name = name;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber;
    }
    if (address) {
        user.address = address;
    }

    return await user.save();
};

// Delete a user
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    return { user, token };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
};