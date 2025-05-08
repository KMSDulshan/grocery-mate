import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, orders]);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/orders/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert("Order deleted successfully!");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete order.");
      }
    }
  };

  const handleEdit = (order) => {
    navigate("/orderform", { state: { order, mode: "edit" } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Orders</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Link
          to="/orderform"
          state={{ mode: "add" }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
        >
          + Add Order
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-center">Loading orders...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No orders found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Delivery</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
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
                  <td className="p-3">{new Date(order.delivery).toLocaleDateString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;