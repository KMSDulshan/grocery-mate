const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const supplierRoutes = require("./src/routes/supplier.route"); 
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json()); 
app.use(cors());

app.use("/suppliers", supplierRoutes);


// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => console.log("Server running on port 5001"));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
