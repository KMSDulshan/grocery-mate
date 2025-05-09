import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateInventoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itemData, setItemData] = useState({
        itemNo: "",
        name: "",
        description: "",
        category: "",
        stock: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [generatingPDF, setGeneratingPDF] = useState(false);

    useEffect(() => {
        // Fetch item data when component is mounted or `id` changes
        axios.get(`http://localhost:5001/inventory/${id}`)
            .then((res) => {
                console.log(res.data);  // Log the fetched data
                setItemData(res.data.inventory);  // Update state with fetched data
                setIsEditing(false);  // Start in "view" mode
            })
            .catch((error) => {
                console.error("Error fetching inventory data", error);
                alert("Failed to fetch item data.");
            })
            .finally(() => {
                setLoading(false);  // Stop loading once data is fetched
            });
    }, [id]);  // Dependency array ensures this runs when `id` changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Save updated item data
        axios.put(`http://localhost:5001/inventory/${id}`, itemData)
            .then(() => {
                alert("Item updated successfully!");
                setIsEditing(false);  
                navigate("/inventory-management"); 
            })
            .catch((error) => {
                console.error("Error updating inventory item", error);
                alert("Failed to update item.");
            });
    };

    const handleEdit = () => {
        setIsEditing(true);  // Enable editing mode
    };
    
    const generatePDF = () => {
        setGeneratingPDF(true);
        
        try {
            // Create a new window for the report
            const reportWindow = window.open('', '_blank');
            
            if (!reportWindow) {
                alert("Please allow pop-ups to view the report.");
                setGeneratingPDF(false);
                return;
            }
            
            // Write the HTML content for the report
            reportWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Inventory Item Report - ${itemData.name}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 40px;
                            color: #333;
                            line-height: 1.5;
                        }
                        .report-container {
                            max-width: 800px;
                            margin: 0 auto;
                            border: 1px solid #ddd;
                            padding: 30px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                            padding-bottom: 20px;
                            border-bottom: 2px solid #eee;
                        }
                        .header h1 {
                            color: #2F855A;
                            margin: 0;
                            font-size: 24px;
                        }
                        .timestamp {
                            color: #777;
                            font-size: 12px;
                            margin-top: 5px;
                        }
                        .item-details {
                            margin-bottom: 30px;
                        }
                        .item-row {
                            display: flex;
                            padding: 10px 0;
                            border-bottom: 1px solid #eee;
                        }
                        .label {
                            font-weight: bold;
                            width: 150px;
                        }
                        .value {
                            flex: 1;
                        }
                        .footer {
                            margin-top: 40px;
                            text-align: center;
                            font-size: 12px;
                            color: #777;
                            padding-top: 20px;
                            border-top: 1px solid #eee;
                        }
                        .print-btn {
                            text-align: center;
                            margin: 30px 0;
                        }
                        .print-btn button {
                            background-color: #3B82F6;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                        }
                        .print-btn button:hover {
                            background-color: #2563EB;
                        }
                        @media print {
                            .print-btn {
                                display: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="report-container">
                        <div class="header">
                            <h1>Inventory Item Report</h1>
                            <div class="timestamp">Generated on: ${new Date().toLocaleString()}</div>
                        </div>
                        
                        <div class="item-details">
                            <div class="item-row">
                                <div class="label">Item Number:</div>
                                <div class="value">${itemData.itemNo}</div>
                            </div>
                            <div class="item-row">
                                <div class="label">Name:</div>
                                <div class="value">${itemData.name}</div>
                            </div>
                            <div class="item-row">
                                <div class="label">Description:</div>
                                <div class="value">${itemData.description || "N/A"}</div>
                            </div>
                            <div class="item-row">
                                <div class="label">Category:</div>
                                <div class="value">${itemData.category}</div>
                            </div>
                            <div class="item-row">
                                <div class="label">Stock Quantity:</div>
                                <div class="value">${itemData.stock}</div>
                            </div>
                        </div>
                        
                        <div class="print-btn">
                            <button onclick="window.print()">Print Report</button>
                        </div>
                        
                        <div class="footer">
                            This report is generated from the Inventory Management System
                        </div>
                    </div>
                </body>
                </html>
            `);
            
            reportWindow.document.close();
            
        } catch (error) {
            console.error("Error generating report", error);
            alert("Failed to generate report.");
        } finally {
            setGeneratingPDF(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span>Loading...</span>  {/* Display a loading indicator */}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl border border-green-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                    Update Inventory Item
                </h2>

                <form className="space-y-4">
                    {/* Item Number */}
                    <div>
                        <label htmlFor="itemNo" className="block text-gray-700 font-semibold mb-1">
                            Item Number
                        </label>
                        <input
                            type="number"
                            name="itemNo"
                            id="itemNo"
                            value={itemData?.itemNo}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none transition duration-300 ${isEditing ? "border-green-400 focus:ring-2 focus:ring-green-300 cursor-pointer" : "bg-gray-100 cursor-not-allowed"}`}
                        />
                    </div>

                    {/* Item Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                            Item Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={itemData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none transition duration-300 ${isEditing ? "border-green-400 focus:ring-2 focus:ring-green-300 cursor-pointer" : "bg-gray-100 cursor-not-allowed"}`}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={itemData.description}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none transition duration-300 ${isEditing ? "border-green-400 focus:ring-2 focus:ring-green-300 cursor-pointer" : "bg-gray-100 cursor-not-allowed"}`}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-semibold mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            value={itemData.category}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none transition duration-300 ${isEditing ? "border-green-400 focus:ring-2 focus:ring-green-300 cursor-pointer" : "bg-gray-100 cursor-not-allowed"}`}
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-gray-700 font-semibold mb-1">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            value={itemData.stock}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none transition duration-300 ${isEditing ? "border-green-400 focus:ring-2 focus:ring-green-300 cursor-pointer" : "bg-gray-100 cursor-not-allowed"}`}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 pt-4">
                        {isEditing ? (
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer"
                                >
                                    Edit Item
                                </button>
                                <button
                                    type="button"
                                    onClick={generatePDF}
                                    disabled={generatingPDF}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                                >
                                    {generatingPDF ? "Generating..." : "Generate Report"}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInventoryForm;