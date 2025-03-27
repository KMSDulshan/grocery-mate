const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  
  let query = {};
  
  if (search) {
    query = {
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ]
    };
  }
  
  const users = await User.find(query).select('-password');
  res.json(users);
});

// @desc    Create a user
// @route   POST /api/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, name, phoneNumber, address, role } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  
  const user = await User.create({
    username,
    email,
    password, // Will be hashed by pre-save middleware
    name,
    phoneNumber,
    address,
    role
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      phoneNumber: user.phoneNumber,
      address: user.address
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const { username, email, name, phoneNumber, address, role } = req.body;
  
  // Check if new username or email already exists for another user
  if (username && username !== user.username) {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(400);
      throw new Error('Username already in use');
    }
  }
  
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already in use');
    }
  }
  
  user.username = username || user.username;
  user.email = email || user.email;
  user.name = name || user.name;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.address = address || user.address;
  user.role = role || user.role;
  
  const updatedUser = await user.save();
  
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    name: updatedUser.name,
    role: updatedUser.role,
    phoneNumber: updatedUser.phoneNumber,
    address: updatedUser.address
  });
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  await user.remove();
  res.json({ message: 'User removed' });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};