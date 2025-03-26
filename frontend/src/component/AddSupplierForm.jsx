import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SuppliersTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch suppliers
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/suppliers");
      const suppliersList = response.data.Suppliers || response.data.suppliers || response.data;
      setSuppliers(Array.isArray(suppliersList) ? suppliersList : []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle supplier deletion
  const handleDelete = async (supplierId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5001/suppliers/${supplierId}`);
        // Remove the deleted supplier from the list
        setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Failed to delete supplier. Please try again.");
      }
    }
  };

  // Generate PDF Report
  const generatePDFReport = () => {
    try {
      if (!suppliers || suppliers.length === 0) {
        alert("No suppliers data available to generate a report.");
        return;
      }

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      doc.setFont("helvetica", "normal");

      // Title
      doc.setFontSize(16);
      doc.text("Suppliers Comprehensive Report", 15, 15);

      // Subtitle with date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 22);

      // Table columns
      const tableColumns = [
        "Name", "Email", "Phone", "Address", "Status", "Products", "Orders", "Revenue"
      ];

      // Ensure data is properly formatted before passing it to `autoTable`
      const tableRows = suppliers.map(supplier => [
        supplier.name || "N/A",
        supplier.email || "N/A",
        supplier.phone || "N/A",
        supplier.address || "N/A",
        supplier.status || "N/A",
        Array.isArray(supplier.products) ? supplier.products.join(", ") : supplier.products || "N/A",
        supplier.orders ? supplier.orders.toString() : "N/A",
        supplier.revenue ? `$${supplier.revenue.toFixed(2)}` : "N/A"
      ]);

      // Generate the table
      doc.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: 30,
        theme: 'striped',
        styles: { fontSize: 9, cellPadding: 3, overflow: 'linebreak' },
        headStyles: { fillColor: [40, 167, 69], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [240, 248, 255] },
        columnStyles: {
          0: { cellWidth: 35 },  // Name
          1: { cellWidth: 45 },  // Email
          2: { cellWidth: 25 },  // Phone
          3: { cellWidth: 50 },  // Address
          4: { cellWidth: 20 },  // Status
          5: { cellWidth: 35 },  // Products
          6: { cellWidth: 20 },  // Orders
          7: { cellWidth: 30 }   // Revenue
        }
      });

      // Add page numbers dynamically
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() - 25,
          doc.internal.pageSize.getHeight() - 10
        );
      }

      // Save PDF with a timestamped filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      doc.save(`Suppliers_Report_${timestamp}.pdf`);

    } catch (error) {
      console.error("Error generating PDF report:", error);
      alert("Failed to generate PDF report. Please try again.");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Filtered suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading and error states
  if (loading) return <div className="p-6 text-center">Loading suppliers...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Suppliers</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Suppliers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-3">
          {/* PDF Report Button */}
          <button
            onClick={generatePDFReport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
          >
            Generate PDF Report
          </button>

          {/* Add Supplier Button */}
          <Link
            to="/form"
            state={{ mode: "add" }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 inline-block"
          >
            + Add Supplier
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {filteredSuppliers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm ? "No suppliers found matching your search" : "No suppliers found"}
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-t">
                  <td className="p-3">{supplier.name}</td>
                  <td className="p-3">{supplier.email}</td>
                  <td className="p-3">{supplier.phone}</td>
                  <td className="p-3">{supplier.address}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleDelete(supplier.id)} className="text-red-600 hover:text-red-700">🗑️</button>
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
