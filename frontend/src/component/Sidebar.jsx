import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Suppliers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      path: "/SupplierManagement",
    },
    {
      title: "Orders",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      path: "/OrdersManagement",
    },
    {
      title: "Generate Report",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      ),
      path: "/report",
    },
  ];

  return (
    <div className="h-full flex flex-col py-8 px-4 bg-green-700">
  
      {/* Menu */}
      <div className="text-white text-lg font-medium mb-6 px-4">Menu</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 text-white hover:bg-green-800 rounded-md transition-all duration-200 group"
              >
                <span className="inline-block mr-3 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="mt-auto border-t border-green-600 pt-4">
        <Link
          to="/profile"
          className="flex items-center p-4 text-white hover:bg-green-800 rounded-md transition-all duration-200"
        >
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs opacity-75">View Profile</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;