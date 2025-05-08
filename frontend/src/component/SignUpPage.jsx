import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import LogoImage from '../assets/grocery-mate-logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    phoneNumber: "", // Add phone number
    address: "", // Add address
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(formData);
      navigate("/Login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Decorative with Logo and Tagline */}
        <div 
          className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-white p-10" 
          style={{ 
            background: 'linear-gradient(135deg, rgb(0, 116, 43) 0%, rgb(0, 116, 43) 100%)'
          }}
        >
          {/* Logo Section */}
          <div className="mb-8">
            <img 
              src={LogoImage} 
              alt="Grocery Mate Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center">Join Smart Grocery Shopping</h1>
          <p className="text-xl mb-6 text-center">Create an account to enjoy personalized recommendations</p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-white p-5">
          <div className="w-full max-w-md p-8">
            {/* Mobile Logo display */}
            <div className="md:hidden flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                   style={{ background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}>
                <i className="fas fa-shopping-cart text-white text-2xl"></i>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">Create an Account</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">Sign up to start your smart shopping journey</p>

            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="John Doe" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="your@email.com" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="••••••••" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="••••••••" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <button 
                type="submit" 
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign Up
              </button>

              <p className="mt-8 text-center text-gray-600">
                Already have an account? 
                <a href="Login" className="text-green-600 hover:text-green-800 font-medium ml-1">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
