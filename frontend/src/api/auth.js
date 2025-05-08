import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
};
