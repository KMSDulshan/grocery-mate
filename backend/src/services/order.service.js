const Order = require("../models/Order");

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const updateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(id, orderData, { new: true });
};

const getAllOrders = async () => {
  return await Order.find();
};

const getOrderById = async (id) => {
  return await Order.findById(id);
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};
