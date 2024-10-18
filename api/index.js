const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
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
const checkoutRoutes = require('./routes/checkoutRoutes');

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

// Check and validate if the route modules are functions (middlewares)
if (typeof userRoutes === 'function') app.use('/api/user', userRoutes);
else console.error('Error: userRoutes is not a function');

if (typeof serviceRoutes === 'function') app.use('/api/service', serviceRoutes);
else console.error('Error: serviceRoutes is not a function');

if (typeof serviceProviderRoutes === 'function') app.use('/api/service-provider', serviceProviderRoutes);
else console.error('Error: serviceProviderRoutes is not a function');

if (typeof categoriesRoutes === 'function') app.use('/api/category', categoriesRoutes);
else console.error('Error: categoriesRoutes is not a function');

if (typeof bookingRoutes === 'function') app.use('/api/booking', bookingRoutes);
else console.error('Error: bookingRoutes is not a function');

if (typeof checkoutRoutes === 'function') app.use('/api/checkout', checkoutRoutes);
else console.error('Error: checkoutRoutes is not a function');

// Start the server
app.listen(4000, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit if there's a server startup error
  }
  console.log('Server running on http://localhost:4000');
});
