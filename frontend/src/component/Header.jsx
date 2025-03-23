import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Order Management", path: "/OrdersManagement" },
    { name: "Supplier Management", path: "/SupplierManagement" }
  ];

  return (
    <header className="bg-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-green-600"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <Link to="/" className="text-xl md:text-2xl font-bold text-white hover:text-green-100 transition-colors duration-200">
                Grocery Mate
              </Link>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Notification Icon - Desktop */}
            <button className="text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-200 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            
            {/* User Profile - Desktop */}
            <button className="text-white hover:bg-green-700 p-1 rounded-full transition-colors duration-200 flex items-center">
              <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Notification Icon - Mobile */}
            <button className="text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-200 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-700 focus:outline-none transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (toggles based on state) */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700 shadow-inner">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          
          {/* User Profile - Mobile */}
          <div className="flex items-center px-3 py-2 mt-4 border-t border-green-600">
            <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 text-white">
              <div className="text-sm font-medium">Admin User</div>
              <Link to="/profile" className="text-xs opacity-75 hover:opacity-100">View Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;