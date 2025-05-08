import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/orders");
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error.message);
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`http://localhost:5000/orders/${orderId}`);
                setOrders((prev) => prev.filter((order) => order._id !== orderId));
                alert("Order deleted successfully!");
            } catch (error) {
                console.error("Error deleting order:", error.message);
                alert("Failed to delete order.");
            }
        }
    };

    const handleEdit = (order) => {
        navigate("/orderform", { state: { order, mode: "edit" } });
    };

    return (
        <div>
            <h2>Orders Management</h2>
            <button onClick={() => navigate("/orderform", { state: { mode: "add" } })}>Create Order</button>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Delivery</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.customer}</td>
                            <td>{order.email}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                            <td>{new Date(order.delivery).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(order)}>Edit</button>
                                <button onClick={() => handleDelete(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersManagement;