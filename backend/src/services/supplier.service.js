const Supplier = require("../models/Supplier");

exports.createSupplier = async (newSupplier) => {
    try {
        const createdSupplier = await Supplier.create(newSupplier);
        return createdSupplier;
    } catch (err) {
        console.error("Error creating supplier:", err);
        return { error: err.message };
    }
};

exports.getAllSuppliers = async () => {
    try {
        const suppliers = await Supplier.find();
        return suppliers;
    } catch (err) {
        console.error("Error fetching suppliers:", err);
        return { error: err.message };
    }
};

exports.deleteSupplier = async (supplierId) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
        if (!deletedSupplier) {
            return { error: "Supplier not found" };
        }
        return deletedSupplier;
    } catch (err) {
        console.error("Error deleting supplier:", err);
        return { error: err.message };
    }
};
exports.updateSupplier = async (supplierId, updatedData) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, updatedData, { new: true });
        if (!updatedSupplier) {
            return { error: "Supplier not found" };
        }
        return updatedSupplier;
    } catch (err) {
        console.error("Error updating supplier:", err);
        return { error: err.message };
    }
};
exports.getSupplierById = async (supplierId) => {
    try {
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return { error: "Supplier not found" };
        }
        return supplier;
    } catch (err) {
        console.error("Error fetching supplier by ID:", err);
        return { error: err.message };
    }
};