const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["Processing", "Delivered", "Pending", "Canceled"], default: "Processing" },
    delivery: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
