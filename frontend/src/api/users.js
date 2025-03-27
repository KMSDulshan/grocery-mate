import axios from 'axios';

const API_URL = '/api/users';

// Get all users
const getUsers = async (token, searchTerm = '') => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search: searchTerm,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userData, config);
  return response.data;
};

// Update user
const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${userId}`, userData, config);
  return response.data;
};

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${userId}`, config);
  return response.data;
};

const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;