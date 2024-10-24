// routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adsfasdgwe';
const authenticateUser = require('../middlewares/authenticateUser'); // Import authentication middleware
const { HttpStatusCode } = require('axios');
const axios = require('axios');
const ServiceProvider = require('../models/ServiceProvider'); // Assume ServiceProvider model
const ServicesModel = require('../models/Services'); // Services schema
const router = express.Router();

// POST: Register a user, freelancer and business
router.post('/register', async (req, res) => {
  const { name, email, password, services, place_id, description, location } = req.body;

  try {
    // Check if the email already exists in the User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    // Encrypt password
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    // User Registration Scenario (No services and place_id)
    if (!services && !place_id) {
      try {
        await User.create({
          name,
          email,
          password: hashedPassword,
        });
        return res.status(201).json({ message: 'User registration successful.' });
      } catch (error) {
        return res.status(422).json(error);
      }
    }

    // Common logic for both freelancer and business registration (requires services validation)
    if (services) {
      // Validate services exist in the database
      const serviceIds = services.map(service => service.serviceId);
      const validServices = await ServicesModel.find({ '_id': { $in: serviceIds } });

      if (validServices.length !== serviceIds.length) {
        return res.status(404).json({ error: 'One or more services not found.' });
      }

      // Ensure each service has a price
      for (let service of services) {
        if (!service.servicePrice) {
          return res.status(400).json({ error: 'Each service must have a price' });
        }
      }
    }

    // Freelancer Registration Scenario (services provided, but no place_id)
    if (services && !place_id) {
      try {
        // Register user in the User collection
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        // Register as a service provider (freelancer) in the ServiceProvider collection
        const newServiceProvider = new ServiceProvider({
          name,
          description,
          services,
        });

        await newServiceProvider.save();
        return res.status(201).json({ message: 'Freelancer registered successfully.', user: newUser, serviceProvider: newServiceProvider });
      } catch (error) {
        return res.status(500).json({ message: 'Error registering freelancer', error });
      }
    }

    // Business Registration Scenario (services and place_id provided)
    if (services && place_id) {
      try {
        // Validate place_id using Google Places API
        const googleDetailsApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
          
        const googleResponse = await axios.get(googleDetailsApiUrl);
        const placeDetails = googleResponse.data.result;

        if (!placeDetails || !placeDetails.place_id) {
          return res.status(404).json({ error: 'Invalid place_id' });
        }

        // Register user in the User collection
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        // Register as a service provider (business) in the ServiceProvider collection
        const newServiceProvider = new ServiceProvider({
          name,
          description,
          services,
          location,
          place_id,
        });

        await newServiceProvider.save();
        return res.status(201).json({ message: 'Business registered successfully.', user: newUser, serviceProvider: newServiceProvider });
      } catch (error) {
        return res.status(500).json({ message: 'Error registering business', error });
      }
    }

    // In case the input doesn't match any of the conditions
    return res.status(400).json({ message: 'Invalid registration data' });

  } catch (error) {
    console.error('Error registering business:', error);
    return res.status(500).json({ 
      message: 'Error registering business',
      error: error.message || 'An unknown error occurred'
      });
  }
});

// Search Business API
router.post('/searchbusiness', async (req, res) => {
  const { businessName, location } = req.body;

  // Construct the Google Maps Geocoding API URL to get the latitude and longitude from the location
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    // Fetch latitude and longitude from the location
    const geocodeResponse = await axios.get(geocodeUrl);
    
    if (geocodeResponse.data.results.length === 0) {
      return res.status(404).json({ message: 'No results found for the given location.' });
    }
    
    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

    // Construct the Google Places API URL to search for businesses
    const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${businessName}&location=${lat},${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    // Fetch businesses from Google Places API
    const placesResponse = await axios.get(placesUrl);
    
    if (placesResponse.data.results.length === 0) {
      return res.status(404).json({ message: 'No businesses found matching the query.' });
    }

    // Extract the desired fields from the response
    const formattedResults = placesResponse.data.results.map(place => ({
      formatted_address: place.formatted_address,
      name: place.name,
      place_id: place.place_id,
    }));

    // Return the formatted results
    return res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching business data:', error);
    return res.status(500).json({ message: 'An error occurred while searching for businesses.' });
  }
});




// POST: Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        // Generate a unique token for this session
        const token = jwt.sign({
          email: userDoc.email,
          id: userDoc._id
        }, jwtSecret, {});

        // Save token to the user's token array
        userDoc.tokens.push(token);
        await userDoc.save();

        // Set token as a cookie and respond
        res.cookie('token', token).json({ "message": "Login successful." });
      } else {
        res.status(HttpStatusCode.Unauthorized).json({ "message": "Password not ok" });
      }
    } else {
      res.status(HttpStatusCode.NotFound).json({ "message": "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET: Retrieve the user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const { name, email, _id } = await User.findById(req.user.id);
    res.json({ name, email, _id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST: Logout the user
router.post('/logout', async (req, res) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const userData = jwt.verify(token, jwtSecret);

      // Find the user and remove the token from the active sessions
      const userDoc = await User.findById(userData.id);
      if (userDoc) {
        userDoc.tokens = userDoc.tokens.filter(t => t !== token);
        await userDoc.save();
      }
    }
    // Clear token from cookies
    res.cookie('token', '').json({ message: 'Logout successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
