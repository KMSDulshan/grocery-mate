import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SuppliersTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredSuppliers, setFilteredSuppliers] = useState([]); // State for filtered suppliers
  const navigate = useNavigate();

  // Fetch suppliers
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/suppliers");
      const suppliersList = response.data.suppliers || response.data;
      setSuppliers(Array.isArray(suppliersList) ? suppliersList : []); // Ensure all data is set
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setError(error.response?.data?.message || "Failed to fetch suppliers");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Filter suppliers based on search term
  useEffect(() => {
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, suppliers]);

  // Delete Supplier
  const handleDelete = async (supplierId) => {
    if (!supplierId) {
      alert("Cannot delete: Invalid supplier ID");
      return;
    }

    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        console.log(`Deleting Supplier ID: ${supplierId}`);

        const response = await axios.delete(`http://localhost:5000/suppliers/${supplierId}`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
          alert("Supplier deleted successfully");
          setSuppliers(prev => prev.filter(supplier => supplier._id !== supplierId)); // Update UI without refetching
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting supplier:", error.response?.data || error.message);
        alert(`Failed to delete supplier: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Edit Supplier - Navigate to Edit Form
  const handleEdit = (supplier) => {
    navigate('/update-supller', { 
      state: { supplier, mode: 'edit' } 
    });
  };

  // Generate PDF Report
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Suppliers Report", 14, 20);

      const tableColumn = ["Name", "Email", "Phone", "Address", "Status","Products","Order","Revenue"];
      const tableRows = suppliers.map(supplier => [
        supplier.name,
        supplier.email,
        supplier.phone,
        supplier.address,
        supplier.status,
        supplier.products,
        supplier.orders,
        supplier.revenue
        
      ]);

      autoTable(doc, {
        startY: 30, 
        head: [tableColumn], 
        body: tableRows 
      });
      
      doc.save("Suppliers_Report.pdf");
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Check console for details.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Suppliers</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Suppliers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="border p-2 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-3">
          <button onClick={generatePDF} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
            Generate PDF Report
          </button>

          <Link
            to="/form"
            state={{ mode: 'add' }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 inline-block"
          >
            + Add Supplier
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {filteredSuppliers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No suppliers found</div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-left">Orders</th>
                <th className="p-3 text-left">Revenue</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier._id} className="border-t">
                  <td className="p-3">{supplier.name}</td>
                  <td className="p-3">{supplier.email}</td>
                  <td className="p-3">{supplier.phone}</td>
                  <td className="p-3">{supplier.address}</td>
                  <td className="p-3">{supplier.products}</td>
                  <td className="p-3">{supplier.orders}</td>
                  <td className="p-3">{supplier.revenue}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-sm font-semibold rounded bg-green-200 text-green-700">
                      {supplier.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(supplier)} className="text-green-600 hover:text-green-700">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(supplier._id)} className="text-red-600 hover:text-red-700">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SuppliersTable;