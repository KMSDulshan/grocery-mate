require('dotenv').config();
const connectDB = require('./config/db');

connectDB().then(() => {
  console.log('Connection test successful');
  process.exit(0);
});