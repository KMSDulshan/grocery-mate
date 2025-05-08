const express = require('express');
const dotenv = require('dotenv');
// Load env vars
dotenv.config();

const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Route files
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/order.route');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/users', userRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});