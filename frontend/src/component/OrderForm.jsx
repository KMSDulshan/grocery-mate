import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    date: "",
    total: "",
    status: "Processing",
    delivery: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const orderData = location.state?.order || {};

  useEffect(() => {
    if (mode === "edit" && orderData.id) {
      setFormData(orderData);
    }
  }, [mode, orderData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await axios.put(`http://localhost:5000/orders/${orderData.id}`, formData);
        alert("Order updated successfully!");
      } else {
        await axios.post("http://localhost:5000/orders", formData);
        alert("Order created successfully!");
      }
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${mode === "edit" ? "update" : "create"} order.`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          {mode === "edit" ? "Edit Order" : "Create Order"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            placeholder="Total Amount"
            className="w-full p-3 border rounded-lg"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
          <input
            type="date"
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/order")}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {mode === "edit" ? "Update Order" : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
