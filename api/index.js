require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Access Stripe secret key
const app = express();

// Import route modules
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');  // Include the checkout routes

// Middleware for CORS, JSON, and cookie parsing
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if there's a MongoDB connection error
  });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/service-provider', serviceProviderRoutes);
app.use('/api/category', categoriesRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/checkout', checkoutRoutes);  // Register the checkout routes

// Start the server
app.listen(4000, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit if there's a server startup error
  }
  console.log('Server running on http://localhost:4000');
});
