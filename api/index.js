const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const axios = require('axios');

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

// Temporary Route to test Google Places API
app.get('/api/places', async (req, res) => {
  const { latitude, longitude, keyword } = req.query;  // Allow dynamic location and category through query params
  const radius = 5000;  // Search within a 5 km radius

  const googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latitude},${longitude}&radius=${radius}&query=${keyword}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(googleApiUrl);
    const places = response.data.results;

    if (places.length > 0) {
      const filteredPlaces = places.map(place => ({
        business_status: place.business_status,
        geometry: place.geometry,
        name: place.name,
        photos: place.photos ? place.photos.map(photo => ({
          photo_reference: photo.photo_reference,
          html_attributions: photo.html_attributions
        })) : [],
        place_id: place.place_id,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        vicinity: place.vicinity
      }));

      res.json({
        message: `Found ${places.length} places for category: ${keyword}`,
        places: filteredPlaces
      });
    } else {
      res.status(404).json({ message: 'No places found.' });
    }
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error);
    res.status(500).json({ error: 'Error fetching places data' });
  }
});




// Start the server
app.listen(4000, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit the process if the server fails to start
  }
  console.log('Server running on http://localhost:4000');
});
