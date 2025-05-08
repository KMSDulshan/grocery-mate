import axios from "axios";

const API_URL = "http://localhost:5000/orders";

export const orderApi = {
  getAllOrders: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getOrderById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  createOrder: async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  },
  updateOrder: async (id, orderData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error.message);
      throw error;
    }
  },
  deleteOrder: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error.message);
      throw error;
    }
  },
};
