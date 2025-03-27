import React, { useState } from "react";
import { X, User, Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSupplierForm = ({ onClose = () => {} }) => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "Active",
    products: 0,
    orders: 0,
    revenue: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "products" || name === "orders"
        ? value === "" ? 0 : parseInt(value, 10)
        : name === "revenue"
        ? value.replace(/[^0-9.]/g, "")
        : value;

    setSupplier({ ...supplier, [name]: parsedValue });
  };

  const resetForm = () => {
    setSupplier({
      name: "",
      email: "",
      address: "",
      phone: "",
      status: "Active",
      products: 0,
      orders: 0,
      revenue: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplier.name || !supplier.email || !supplier.address || !supplier.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/suppliers",
        supplier,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      alert("Supplier added successfully!");
      resetForm();
      onClose(); // Ensure onClose is called correctly
    } catch (error) {
      console.error("Error adding supplier:", error.response ? error.response.data : error.message);
      
      alert(error.response?.data?.message || "Failed to add supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-green-600"></div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
          disabled={loading}
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-green-700">Add New Supplier</h2>
          <p className="text-gray-500 text-sm">Enter supplier details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">
              Basic Information
            </h3>

            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-green-600">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Supplier Name"
                  value={supplier.name}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-green-600">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={supplier.email}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-green-600">
                    <Phone size={16} />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={supplier.phone}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-green-600">
                  <MapPin size={16} />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={supplier.address}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">
              Supplier Metrics
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                name="products"
                placeholder="Products"
                value={supplier.products}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
              />

              <input
                type="number"
                name="orders"
                placeholder="Orders"
                value={supplier.orders}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
              />

              <input
                type="text"
                name="revenue"
                placeholder="Revenue"
                value={supplier.revenue}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
          
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/suppliers");
              }}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierForm;
