import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InventoryList = () => {
    const navigate = useNavigate();
    const componentPDF = useRef();
    const reportRef = useRef();

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showReportPreview, setShowReportPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState({
        title: "Inventory Report",
        company: "Your Company Name",
        date: new Date().toLocaleDateString(),
        filterApplied: false
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:5001/inventory");

                // ✅ Fix: ensure data is an array
                const data = Array.isArray(response.data) ? response.data : response.data.data;

                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.error("Invalid data format:", response.data);
                    setItems([]); // avoid crash
                }
            } catch (error) {
                console.error("Error fetching items:", error);
                setItems([]); // safe fallback
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5001/inventory/${id}`);
                alert("Item deleted successfully");
                setItems(items.filter(item => item._id !== id)); // Update state after delete
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("Failed to delete item");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/updateinventory/${id}`);
    };

    const handleClick = (id) => {
        console.log("Button clicked with ID:", id);
        navigate(`/updateinventory/${id}`);
    };

    const handleView = (id) => {
        navigate(`/viewdetails/${id}`);
    };

    // Get filtered items based on search term
    const filteredItems = items.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate inventory summary
    const calculateSummary = (items) => {
        let totalItems = items.length;
        let totalStock = items.reduce((sum, item) => sum + (parseInt(item.stock) || 0), 0);
        
        // Group by category
        let categories = {};
        items.forEach(item => {
            if (item.category) {
                categories[item.category] = (categories[item.category] || 0) + 1;
            }
        });
        
        // Find low stock items (less than 10)
        let lowStockCount = items.filter(item => (parseInt(item.stock) || 0) < 10).length;
        
        return {
            totalItems,
            totalStock,
            categories,
            lowStockCount
        };
    };

    // Generate PDF using html2canvas
    const generatePDF = async () => {
        if (!reportRef.current) {
            alert('Report container not found');
            return;
        }

        setLoading(true);
        try {
            const reportElement = reportRef.current;
            const canvas = await html2canvas(reportElement, {
                scale: 1.5,
                useCORS: true,
                logging: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Calculate dimensions
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`Inventory_Report_${new Date().toISOString().split('T')[0]}.pdf`);
            
            setLoading(false);
            alert('PDF downloaded successfully!');
            setShowReportPreview(false);
        } catch (error) {
            setLoading(false);
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const handleShowReportPreview = () => {
        setReportData({
            ...reportData,
            filterApplied: searchTerm.length > 0,
            searchTerm: searchTerm,
            date: new Date().toLocaleDateString()
        });
        setShowReportPreview(true);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="p-6">
            {/* Custom cursor color */}
            <style>{`
                input:focus, button:hover { cursor: pointer; caret-color: green; }
                @media print {
                    .no-print { display: none; }
                    .print-only { display: block; }
                }
                /* Icon button styles */
                .icon-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                .icon-button:hover {
                    transform: translateY(-1px);
                }
                .icon-button svg {
                    width: 18px;
                    height: 18px;
                }
            `}</style>

            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">All Inventory Items</h1>

                <div className="flex justify-between items-center mb-4 no-print">
                    <input
                        type="text"
                        placeholder="Search by item name"
                        className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <div className="space-x-2">
                        <Link
                            to="/addinventory"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
                        >
                            Add New Item
                        </Link>

                        <button
                            onClick={handleShowReportPreview}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition duration-200"
                            style={{ boxShadow: '0 4px 6px rgba(0, 128, 0, 0.4)' }}
                        >
                            📥 Generate Report
                        </button>
                    </div>
                </div>

                {/* Regular Inventory Table */}
                {!showReportPreview && (
                    <div ref={componentPDF}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Item No</th>
                                        <th className="py-3 px-4 text-left">Item Name</th>
                                        <th className="py-3 px-4 text-left">Description</th>
                                        <th className="py-3 px-4 text-left">Category</th>
                                        <th className="py-3 px-4 text-left">Stock</th>
                                        <th className="py-3 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(items) &&
                                        filteredItems.map((item, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-100">
                                                <td className="py-3 px-4">{item.itemNo}</td>
                                                <td className="py-3 px-4">{item.name}</td>
                                                <td className="py-3 px-4">{item.description}</td>
                                                <td className="py-3 px-4">{item.category}</td>
                                                <td className="py-3 px-4">{item.stock}</td>
                                                <td className="py-3 px-4 flex space-x-2">
                                                    {/* View Button - Eye Icon 
                                                    <button
                                                        onClick={() => handleView(item._id)}
                                                        className="icon-button bg-green-500 hover:bg-green-600 text-white"
                                                        title="View Details"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>*/}
                                                    
                                                    {/* Edit Button - Pencil Icon */}
                                                    <button
                                                        onClick={() => handleClick(item._id)}
                                                        className="icon-button bg-blue-500 hover:bg-blue-600 text-white"
                                                        title="Edit Item"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    
                                                    {/* Delete Button - Trash Icon */}
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="icon-button bg-red-500 hover:bg-red-600 text-white"
                                                        title="Delete Item"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Report Preview Modal */}
                {showReportPreview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-4/5 h-4/5 overflow-auto">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-xl font-bold">Report Preview</h2>
                                <div>
                                    <button 
                                        onClick={() => setShowReportPreview(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Close
                                    </button>
                                    <button 
                                        onClick={generatePDF}
                                        disabled={loading}
                                        className={`${loading ? 'bg-gray-400' : 'bg-green-600'} text-white px-4 py-2 rounded`}
                                    >
                                        {loading ? 'Generating...' : 'Download PDF'}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Report Content */}
                            <div id="reportToPrint" ref={reportRef} className="p-8 bg-white">
                                <InventoryReport 
                                    items={filteredItems} 
                                    reportData={reportData}
                                    summary={calculateSummary(filteredItems)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Separate component for the PDF report
const InventoryReport = ({ items, reportData, summary }) => {
    return (
        <div className="max-w-full mx-auto bg-white p-6">
            {/* Report Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">{reportData.company}</h1>
                <h2 className="text-2xl font-semibold mt-2">{reportData.title}</h2>
                <p className="mt-2">Generated on: {reportData.date} at {new Date().toLocaleTimeString()}</p>
                {reportData.filterApplied && (
                    <p className="mt-1 text-gray-600">
                        Filter applied: Items containing "{reportData.searchTerm}"
                    </p>
                )}
            </div>

            {/* Report Summary */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Inventory Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-3 rounded shadow">
                        <p className="text-sm text-gray-600">Total Items</p>
                        <p className="text-2xl font-bold">{summary.totalItems}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded shadow">
                        <p className="text-sm text-gray-600">Total Stock</p>
                        <p className="text-2xl font-bold">{summary.totalStock}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded shadow">
                        <p className="text-sm text-gray-600">Categories</p>
                        <p className="text-2xl font-bold">{Object.keys(summary.categories).length}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded shadow">
                        <p className="text-sm text-gray-600">Low Stock Items</p>
                        <p className="text-2xl font-bold">{summary.lowStockCount}</p>
                    </div>
                </div>

                {/* Category Breakdown */}
                {Object.keys(summary.categories).length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">Category Breakdown:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {Object.entries(summary.categories).map(([category, count], index) => (
                                <div key={index} className="bg-white p-2 rounded border">
                                    <span className="font-medium">{category}:</span> {count} items
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Inventory Items Table */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Inventory Items</h3>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-3 text-left border">Item No</th>
                            <th className="py-2 px-3 text-left border">Item Name</th>
                            <th className="py-2 px-3 text-left border">Description</th>
                            <th className="py-2 px-3 text-left border">Category</th>
                            <th className="py-2 px-3 text-left border">Stock</th>
                            <th className="py-2 px-3 text-left border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-2 px-3 border">{item.itemNo}</td>
                                <td className="py-2 px-3 border font-medium">{item.name}</td>
                                <td className="py-2 px-3 border">{item.description}</td>
                                <td className="py-2 px-3 border">{item.category}</td>
                                <td className="py-2 px-3 border">{item.stock}</td>
                                <td className="py-2 px-3 border">
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        parseInt(item.stock) <= 0 ? 'bg-red-100 text-red-800' :
                                        parseInt(item.stock) < 10 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {parseInt(item.stock) <= 0 ? 'Out of Stock' :
                                         parseInt(item.stock) < 10 ? 'Low Stock' : 'In Stock'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-4 border-t text-sm text-gray-600">
                <p>This is an automatically generated report from the inventory management system.</p>
                <p className="mt-1">For questions or concerns, please contact the inventory manager.</p>
                <div className="mt-4 text-center text-xs text-gray-500">
                    <p>Page 1 of 1</p>
                </div>
            </div>
        </div>
    );
};

export default InventoryList;