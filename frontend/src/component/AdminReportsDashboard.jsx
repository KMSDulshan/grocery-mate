import React, { useState } from 'react';
import { Download, FileText, ShieldCheck } from 'lucide-react';

const AdminReportsDashboard = () => {
  const [activeReport, setActiveReport] = useState('userSummary');
  const [users] = useState([
    {
      username: 'admin',
      email: 'admin@grocery.com',
      name: 'Admin',
      address: '1234 Admin Street',
      phoneNumber: '123-456-7890',
      role: 'Admin'
    },
    {
      username: 'user',
      email: 'user@example.com',
      name: 'User',
      address: '1234 User Street',
      phoneNumber: '123-456-7890',
      role: 'User'
    }
    
    
  ]);

  const generateCsvReport = () => {
    // Create CSV content
    const csvContent = [
      'Username,Email,Role',
      ...users.map(user => `${user.username},${user.email},${user.role}`)
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) {
      // For IE 10+
      navigator.msSaveBlob(blob, 'user_summary_report.csv');
    } else {
      link.href = URL.createObjectURL(blob);
      link.download = 'user_summary_report.csv';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm">Manage users and view reports</p>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b shadow-sm px-6 py-3">
        <div className="flex space-x-4 items-center">
          <span className="text-gray-600 hover:text-green-600 cursor-pointer">
            User Management
          </span>
          <span className="text-green-600 font-semibold border-b-2 border-green-600 pb-1">
            Reports
          </span>
        </div>
      </div>

      {/* Reports Content */}
      <div className="p-6 bg-green-50">
        <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
          {/* Report Type Selection */}
          <div className="flex space-x-4 mb-6">
            <button 
              className={`flex items-center px-4 py-2 rounded-md transition ${
                activeReport === 'userSummary' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
              onClick={() => setActiveReport('userSummary')}
            >
              <FileText className="mr-2" size={20} />
              User Summary Report
            </button>
            <button 
              className={`flex items-center px-4 py-2 rounded-md transition ${
                activeReport === 'userRoles' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
              onClick={() => setActiveReport('userRoles')}
            >
              <ShieldCheck className="mr-2" size={20} />
              User Roles Report
            </button>
          </div>

          {/* Report Content */}
          <div className="bg-green-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              User Summary Report
            </h2>

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-md shadow-sm border border-green-100">
                <h3 className="text-green-600 font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-green-800">{users.length}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-green-100">
                <h3 className="text-green-600 font-medium">Administrators</h3>
                <p className="text-2xl font-bold text-green-800">
                  {users.filter(u => u.role === 'Admin').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-green-100">
                <h3 className="text-green-600 font-medium">Regular Users</h3>
                <p className="text-2xl font-bold text-green-800">
                  {users.filter(u => u.role === 'User').length}
                </p>
              </div>
            </div>

            {/* User Table */}
            <table className="w-full bg-white rounded-md overflow-hidden shadow-sm">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="p-3 text-left">USERNAME</th>
                  <th className="p-3 text-left">EMAIL</th>
                  <th className="p-3 text-left">NAME</th>
                  <th className="p-3 text-left">ADDRESS</th>
                  <th className="p-3 text-left">PHONE NUMBER</th>
                  <th className="p-3 text-left">ROLE</th>
                  
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-green-100 hover:bg-green-50">
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
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Download Button */}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={generateCsvReport}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center transition"
              >
                <Download className="mr-2" size={20} />
                Download CSV Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsDashboard;