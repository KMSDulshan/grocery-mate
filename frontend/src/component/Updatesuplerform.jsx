import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Updatesuplerform() {
  const location = useLocation();
  const navigate = useNavigate();
  const supplierData = location.state?.supplier || {}; // Get supplier if editing
  const mode = location.state?.mode || "add"; // Check if it's add or edit

  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  // Load supplier data if editing
  useEffect(() => {
    if (mode === "edit") {
      setSupplier(supplierData);
    }
  }, [mode, supplierData]);

  // Handle input changes
  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "edit") {
        // Update supplier
        await axios.put(`http://localhost:5001/suppliers/${supplier._id}`, supplier, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Supplier updated successfully!");
      } else {
        // Add supplier
        await axios.post("http://localhost:5001/suppliers", supplier, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Supplier added successfully!");
      }

      navigate("/suppliers");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        {mode === "edit" ? "Edit Supplier" : "Add Supplier"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={supplier.name}
          onChange={handleChange}
          placeholder="Supplier Name"
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          name="email"
          value={supplier.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="phone"
          value={supplier.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="address"
          value={supplier.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <select
          name="status"
          value={supplier.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {mode === "edit" ? "Update Supplier" : "update Supplier"}
        </button>
      </form>
    </div>
  );
}

export default Updatesuplerform;
