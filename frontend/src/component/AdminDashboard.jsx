import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    name: '',
    phoneNumber: '',
    address: '',
    role: 'User',
    password: '',
    confirmPassword: ''
  });

  const [editUser, setEditUser] = useState({
    _id: '',
    username: '',
    email: '',
    name: '',
    phoneNumber: '',
    address: '',
    role: 'User'
  });

  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setErrorMessage('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (isEdit = false) => {
    const newErrors = {};
    const userToValidate = isEdit ? editUser : newUser;

    if (!userToValidate.username) {
      newErrors.username = 'Username is required';
    } else if (userToValidate.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userToValidate.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(userToValidate.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!userToValidate.name) {
      newErrors.name = 'Full name is required';
    } else if (userToValidate.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!isEdit) {
      if (!newUser.password) {
        newErrors.password = 'Password is required';
      } else if (newUser.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!newUser.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (newUser.password !== newUser.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const { confirmPassword, ...userToAdd } = newUser;
        
        const response = await axios.post(API_URL, {
          username: userToAdd.username,
          email: userToAdd.email,
          password: userToAdd.password,
          role: userToAdd.role,
          name: userToAdd.name,
          phoneNumber: userToAdd.phoneNumber,
          address: userToAdd.address
        });

        setUsers([...users, response.data]);
        setIsAddUserModalOpen(false);
        setNewUser({
          username: '',
          email: '',
          name: '',
          phoneNumber: '',
          address: '',
          role: 'User',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
        setErrorMessage('');
      } catch (error) {
        console.error('Error creating user:', error);
        setErrors({ submit: error.response?.data?.error || 'Failed to create user' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditUser = async () => {
    if (validateForm(true)) {
      setIsLoading(true);
      try {
        const response = await axios.put(`${API_URL}/${editUser._id}`, {
          username: editUser.username,
          email: editUser.email,
          role: editUser.role,
          name: editUser.name,
          phoneNumber: editUser.phoneNumber,
          address: editUser.address
        });

        setUsers(users.map(user => 
          user._id === editUser._id ? response.data : user
        ));
        setIsEditUserModalOpen(false);
        setErrors({});
        setErrorMessage('');
      } catch (error) {
        console.error('Error updating user:', error);
        setErrors({ submit: error.response?.data?.error || 'Failed to update user' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers(users.filter(user => user._id !== id));
        setErrorMessage('');
      } catch (error) {
        console.error('Error deleting user:', error);
        setErrorMessage('Failed to delete user. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditClick = (user) => {
    setEditUser({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      role: user.role || 'User'
    });
    setIsEditUserModalOpen(true);
    setErrors({});
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-green-50">
      <div className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Admin Dashboard</div>
        </div>
      </div>
      <div className="border-b px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center mr-4 text-green-600 border-b-2 border-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            User Management
          </div>
          <Link to="/adminreports" className="text-gray-500 hover:text-green-600 transition">
            Reports
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <div className="bg-white shadow-lg rounded-lg border border-green-100">
          {/* Search and Add User Section */}
          <div className="flex justify-between items-center p-4 border-b border-green-100">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-3 text-green-400" size={20} />
            </div>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  <Plus className="mr-2" size={20} /> Add User
                </>
              )}
            </button>
          </div>

          {/* Add User Modal */}
          {isAddUserModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[600px]">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                {errors.submit && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    {errors.submit}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                    <input 
                      type="text"
                      placeholder="Enter username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input 
                      type="email"
                      placeholder="Enter email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                    <input 
                      type="password"
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
                    <input 
                      type="password"
                      placeholder="Confirm password"
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input 
                      type="text"
                      placeholder="Enter full name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="text"
                      placeholder="Enter phone number"
                      value={newUser.phoneNumber}
                      onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
                      className="w-full p-2 border border-green-200 rounded"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text"
                      placeholder="Enter address"
                      value={newUser.address}
                      onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                      className="w-full p-2 border border-green-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                    <select 
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full p-2 border border-green-200 rounded"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="col-span-2 flex space-x-4 mt-4">
                    <button 
                      onClick={handleAddUser}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating...' : 'Add User'}
                    </button>
                    <button 
                      onClick={() => {
                        setIsAddUserModalOpen(false);
                        setNewUser({
                          username: '',
                          email: '',
                          name: '',
                          phoneNumber: '',
                          address: '',
                          role: 'User',
                          password: '',
                          confirmPassword: ''
                        });
                        setErrors({});
                      }}
                      className="w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {isEditUserModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[600px]">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                {errors.submit && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    {errors.submit}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                    <input 
                      type="text"
                      placeholder="Enter username"
                      value={editUser.username}
                      onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input 
                      type="email"
                      placeholder="Enter email"
                      value={editUser.email}
                      onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={editUser.name}
                      onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-green-200'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={editUser.phoneNumber}
                      onChange={(e) => setEditUser({...editUser, phoneNumber: e.target.value})}
                      className="w-full p-2 border border-green-200 rounded"
                    />
                  </div>   
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      value={editUser.address}
                      onChange={(e) => setEditUser({...editUser, address: e.target.value})}
                      className="w-full p-2 border border-green-200 rounded"
                    />
                  </div> 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                    <select
                      value={editUser.role}
                      onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                      className="w-full p-2 border border-green-200 rounded"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>    
                  <div className="col-span-2 flex space-x-4 mt-4">
                    <button 
                      onClick={handleEditUser}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update User'}
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditUserModalOpen(false);
                        setErrors({});
                      }}
                      className="w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Table */}
          {isLoading ? (
            <div className="p-8 text-center">Loading users...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-green-50 text-green-800 font-semibold">
                  <th className="p-3 text-left">USERNAME</th>
                  <th className="p-3 text-left">EMAIL</th>
                  <th className="p-3 text-left">NAME</th>
                  <th className="p-3 text-left">ADDRESS</th>
                  <th className="p-3 text-left">PHONE NUMBER</th>
                  <th className="p-3 text-left">ROLE</th>
                  <th className="p-3 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-green-100 hover:bg-green-50">
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.address}</td>
                      <td className="p-3">{user.phoneNumber}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${user.role === 'Admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-green-600 hover:text-green-800 transition"
                            disabled={isLoading}
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-800 transition"
                            disabled={isLoading}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;