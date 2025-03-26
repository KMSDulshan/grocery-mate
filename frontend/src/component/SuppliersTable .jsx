;
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";



const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);

}

const SuppliersTable = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/suppliers")
      .then((response) => response.json())
      .then((data) => setSuppliers(data.Suppliers))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Suppliers</h2>

      {/* Search & Buttons */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Suppliers"
          className="border p-2 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
            Generate PDF Report
          </button>

          <Link
      to="/form"
      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 inline-block"
    >
      + Add Supplier
    </Link>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Revenue</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.email}</td>
                <td className="p-3">{supplier.phone}</td>
                <td className="p-3">{supplier.address}</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-sm font-semibold rounded bg-green-200 text-green-700">
                    {supplier.status}
                  </span>
                </td>
                <td className="p-3">{supplier.products}</td>
                <td className="p-3">{supplier.orders}</td>
                <td className="p-3">{supplier.revenue}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-green-600 hover:text-green-700">✏️</button>
                  <button className="text-red-600 hover:text-red-700">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuppliersTable;
