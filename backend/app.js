require("dotenv").config({ path: "./src/.env" }); // Ensure correct path to .env
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const supplierRoutes = require("./src/routes/supplier.route");
const userRoutes = require("./src/routes/user.route");
const orderRoutes = require("./src/routes/order.route");

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('MONGODB_URI is undefined. Please check your .env file.');
    process.exit(1); // Exit the application if the URI is missing
}

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/api", userRoutes);
app.use("/orders", orderRoutes);

// Connect to MongoDB
mongoose.connect(mongoUri)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});