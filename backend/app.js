const express = require("express");
const mongoose = require("mongoose");
const supplierRoutes = require("./Routes/SupplierRoute"); // Ensure correct path

const app = express();
const cors = require("cors");
// Middleware
app.use(express.json()); // ✅ Enables JSON parsing
app.use(cors());
// Use Supplier Routes
app.use("/suppliers", supplierRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://boot:boot@cluster0.kcv7y.mongodb.net/grocery-mate?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => console.log("Server running on port 5001"));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
