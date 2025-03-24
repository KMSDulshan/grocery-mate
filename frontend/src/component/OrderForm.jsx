import React, { useState } from "react";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    email: "",
    date: "",
    total: "",
    status: "Processing",
    delivery: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted", formData);
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      customer: "",
      email: "",
      date: "",
      total: "",
      status: "Processing",
      delivery: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-xl border border-gray-300">
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">Create New Order</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Order ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Order Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Total Amount</label>
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
              >
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
              <input
                type="date"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-6 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-400"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
