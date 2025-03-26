const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supplierSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    products: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }, // Changed from string to number for calculations
}, { timestamps: true });

const Supplier = model("SupplierModel", supplierSchema);

module.exports = Supplier;