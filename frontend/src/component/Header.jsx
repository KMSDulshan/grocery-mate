import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const GroceryMateHeader = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Navigation based on selected category
    switch(value) {
      case 'All Services':
        navigate('/services');
        break;
      case 'order':
        navigate('/order');
        break;
      case 'Vegetables':
        navigate('/suppliers');
        break;
      case 'Dairy':
        navigate('/inventory-management');
        break;
      case 'Bakery':
        navigate('/admindashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <header className="bg-green-50 shadow-sm">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-100">
        {/* Logo and Categories */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold" style={{color: '#2ecc71'}}>
              GroceryMate
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center">
            <select 
              className="text-gray-700 font-medium border-r pr-2 mr-2 bg-green-50"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              
              <option value="order">Order Management</option>
              <option value="Vegetables">Supplier Management</option>
              <option value="Dairy">Inventory Management</option>
              <option value="Bakery">User Management</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <div className="flex items-center border border-green-200 rounded-md overflow-hidden">
            <input 
              type="text" 
              placeholder="Search for groceries..." 
              className="flex-grow px-3 py-2 w-full bg-green-50"
            />
            <button className="bg-green-500 text-white px-4 py-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zm-6 4a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <button className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              3
            </span>
          </button>

          {/* Profile */}


<Link to="/ProfilePage" className="flex items-center">
  <img 
    src="/profile-image.jpg" 
    alt="Profile" 
    className="rounded-full h-8 w-8 mr-2" 
  />
  <span className="text-sm text-green-800">Profile</span>
</Link>

          {/* Sign Up */}
          <Link to="/SignUp">
  <button className="bg-green-500 text-white px-4 py-2 rounded-md">
    Sign Up
  </button>
</Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-green-100 py-2">
        <div className="container mx-auto flex justify-center space-x-6">
          <a href="/" className="text-green-800 hover:text-green-600">Home</a>
          <a href="/aboutus" className="text-green-800 hover:text-green-600">About Us</a>
          <a href="/contactus" className="text-green-800 hover:text-green-600">Contact Us</a>
         
        </div>
      </nav>
    </header>
  );
};

export default GroceryMateHeader;