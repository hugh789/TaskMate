const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticateUser = require('./middlewares/authenticateUser');
const app = express();  // Fixed the incomplete variable 'app'

const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Use middleware to parse incoming JSON and handle CORS
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],  // Allow both localhost and 127.0.0.1
  credentials: true,  // Enable credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));
app.use(express.json());
app.use(cookieParser());

// Log middleware usage
console.log('Middleware for CORS, JSON parsing, and cookies applied.');

// MongoDB connection with logging
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/service-provider', serviceProviderRoutes);
app.use('/api/category', categoriesRoutes);
app.use('/api/booking', bookingRoutes);

// Start the server
app.listen(4000, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit the process if the server fails to start
  }
  console.log('Server running on http://localhost:4000');
});
