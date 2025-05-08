const mongoose = require("mongoose");
const Order = require("../models/Order");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { customer, email, date, total, status, delivery } = req.body;

  if (!customer || !email || !date || !total || !delivery) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newOrder = new Order({ customer, email, date, total, status, delivery });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer, email, date, total, status, delivery } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Order ID" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { customer, email, date, total, status, delivery },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Order ID" });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order", error: err.message });
  }
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
