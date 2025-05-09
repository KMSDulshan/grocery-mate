import React, { useState } from "react";

const AddInventory = () => {
    const [itemData, setItemData] = useState({
        itemNo: "",
        name: "",
        description: "",
        category: "",
        stock: "",
    });

    const [errors, setErrors] = useState({
        itemNo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });

        // Validation for item number length (4 digits)
        if (name === "itemNo" && value.length !== 4) {
            setErrors({
                ...errors,
                itemNo: "Item number must be exactly 4 digits",
            });
        } else {
            setErrors({
                ...errors,
                itemNo: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/inventory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });

            if (!response.ok) {
                throw new Error("Failed to create item");
            }

            alert("Item created successfully");

            // Reset form
            setItemData({
                itemNo: "",
                name: "",
                description: "",
                category: "",
                stock: "",
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Error occurred while creating the item");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl border border-green-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Add Inventory Item</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Item Number */}
                    <div>
                        <label htmlFor="itemNo" className="block text-green-700 font-semibold mb-1">
                            Item Number
                        </label>
                        <input
                            type="number"
                            name="itemNo"
                            id="itemNo"
                            value={itemData.itemNo}
                            onChange={handleChange}
                            placeholder="Enter 4-digit item number"
                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition duration-200"
                        />
                        {errors.itemNo && (
                            <p className="text-red-500 text-sm mt-1">{errors.itemNo}</p>
                        )}
                    </div>

                    {/* Item Name */}
                    <div>
                        <label htmlFor="name" className="block text-green-700 font-semibold mb-1">
                            Item Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={itemData.name}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition duration-200"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-green-700 font-semibold mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={itemData.description}
                            onChange={handleChange}
                            placeholder="Enter item description"
                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition duration-200"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-green-700 font-semibold mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            value={itemData.category}
                            onChange={handleChange}
                            placeholder="Enter item category"
                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition duration-200"
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-green-700 font-semibold mb-1">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            value={itemData.stock}
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition duration-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300"
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInventory;
