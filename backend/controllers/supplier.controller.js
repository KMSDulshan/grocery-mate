const mongoose = require("mongoose");
const Supplier = require("../models/Supplier");
const supplierService = require("../services/supplier.service");

// Get all suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        if (!suppliers || suppliers.length === 0) {
            return res.status(404).json({ message: "No suppliers found" });
        }
        return res.status(200).json({ suppliers });
    } catch (err) {
        console.error("Error fetching suppliers:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a new supplier
const createSupplier = async (req, res) => {
    const { name, email, phone, address, status, products, orders, revenue } = req.body;

    // Check for missing required fields
    if (!name || !email || !phone || !address) {
        return res.status(400).json({
            message: "All required fields (name, email, phone, address) must be provided."
        });
    }

    try {
        const createdSupplier = await supplierService.createSupplier({
            name, email, phone, address, status, products, orders, revenue
        });
        return res.status(201).json({ message: "Supplier added successfully", createdSupplier });
    } catch (err) {
        console.error("Error adding supplier:", err);
        return res.status(500).json({ message: "Unable to add supplier", error: err.message });
    }
};

// Get supplier by ID
const getById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Supplier ID" });
    }

    try {
        const supplier = await supplierService.getSupplierById(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        return res.status(200).json({ supplier });
    } catch (err) {
        console.error("Error fetching supplier:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update supplier by ID
const updatesupplier = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, status, products, orders, revenue } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Supplier ID" });
    }

    // Ensure at least one field is provided for update
    if (!name && !email && !phone && !address && !status && !products && !orders && !revenue) {
        return res.status(400).json({ message: "At least one field must be provided for update." });
    }

    try {
        const supplier = await supplierService.updateSupplier(id, {
            name, email, phone, address, status, products, orders, revenue
        });

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found or update failed" });
        }

        return res.status(200).json({ message: "Supplier updated successfully", supplier });
    } catch (err) {
        console.error("Error updating supplier:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete supplier by ID
const deletesupplier = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Supplier ID" });
    }

    try {
        const supplier = await supplierService.deleteSupplier(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        return res.status(200).json({ message: "Supplier deleted successfully", supplier });
    } catch (err) {
        console.error("Error deleting supplier:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    getAllSuppliers,
    createSupplier,
    getById,
    updatesupplier,
    deletesupplier
};
