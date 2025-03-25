import React, { useState } from "react";
import { Link } from 'react-router-dom';
const OrdersManagement = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john.doe@example.com",
      date: "2024-03-15",
      total: "$11.95",
      status: "Processing",
      delivery: "2024-03-17",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2024-03-14",
      total: "$7.98",
      status: "Delivered",
      delivery: "2024-03-16",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Orders</h2>

      {/* Search & Buttons */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Orders"
          className="border p-2 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-green-700">
            🛒 Cart (0)
          </button>

          <Link
      to="/orderform"
      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 inline-block"
    >
      + Add Orders
    </Link>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Delivery</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">
                  <strong>{order.customer}</strong>
                  <br />
                  <span className="text-sm text-gray-600">{order.email}</span>
                </td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded ${
                      order.status === "Processing"
                        ? "bg-blue-200 text-blue-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.delivery}</td>
                <td className="p-3">
                  <button className="text-green-600 hover:text-green-700">
                    ✏️ Edit
                  </button>
                  <select className="ml-2 border px-2 py-1 rounded text-sm">
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Pending</option>
                    <option>Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;