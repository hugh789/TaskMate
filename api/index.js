const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const Services = require('./models/Services');
const Category = require('./models/Category');
const ServiceRequest = require('./models/ServiceRequest');
const cookieParser = require('cookie-parser');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adsfasdgwe';

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

// Middleware to authenticate and attach user to the request
const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (err, userData) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = userData; // Attach user data to the request
    next();
  });
};


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

// API/register POST: User registration
app.post('/api/register', async (req, res) => {
  const {name, email, password} = req.body;

  console.log('Received registration data:', { name, email });

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),  // Hash the password
    });

    console.log('User registered successfully:', userDoc);
    res.json(userDoc);
  } catch (e) {
    console.error('Error during registration:', e);
    res.status(422).json(e);
  }
});


// api/login POST: User Log in
app.post('/api/login', async (req, res) => {
  console.log('Login request received:', req.body);
  mongoose.connect(process.env.MONGO_URL);
  
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      console.log('User found:', userDoc.email);
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        console.log('Password is correct for user:', userDoc.email);
        jwt.sign({
          email: userDoc.email,
          id: userDoc._id
        }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        console.warn('Password incorrect for user:', userDoc.email);
        res.status(422).json('Password not ok');
      }
    } else {
      console.warn('User not found for email:', email);
      res.json('User not found');
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
//api/profile get: Retrieve user profile
app.get('/api/profile', (req, res) => {
  console.log('Profile request received');
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error('JWT verification error:', err);
        throw err;
      }
      const { name, email, _id } = await User.findById(userData.id);
      console.log('Profile data sent:', { name, email, _id });
      res.json({ name, email, _id });
    });
  } else {
    console.warn('No token provided in request cookies');
    res.json(null);
  }
});

// api/logout POST: Logout user
app.post('/api/logout', (req, res) => {
  console.log('Logout request received');
  res.cookie('token', '').json(true);
});

// api/services POST: Allow authenticated users to create a new service
app.post('/api/services', async (req, res) => {
  const { token } = req.cookies;
  const {
    title, description, categoryName, price, location
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const {_id} = await Category.findOne({name:categoryName});
      console.log(categoryName,_id);
      const servicesDoc = await Services.create({
        provider: userData.id,
        category: _id,
        title,
        description,
        categoryName,  // Save only the category name as a string
        price,
        location,
      });
      res.json(servicesDoc);
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Get services for authenticated user
app.get('/api/services', async (req, res) => {
  try {
    const services = await Services.find(); // Ensure `Services` is correctly imported and referenced
    res.json(services);  // Send the fetched services as the response
  } catch (error) {
    console.error('Error fetching services:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 status code with an error message
  }
});



// POST /api/request-service: Allow users to request a service
app.post('/api/request-service', authenticateUser, async (req, res) => {
  const { title, location, description, neededBy, notes } = req.body;

  try {
    const serviceRequest = new ServiceRequest({
      user: req.user.id, // Use the authenticated user’s ID
      title,
      location,
      description,
      neededBy,
      notes,
    });

    await serviceRequest.save();
    res.status(201).json(serviceRequest);
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({ error: "Failed to create service request" });
  }
});

// GET /api/request-service: Fetch tasks for the logged-in user
app.get('/api/request-service', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' });

      
      const serviceRequests = await ServiceRequest.find({ user: userData.id }).populate('category');
      res.json(serviceRequests);
    });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ error: 'Failed to fetch service requests' });
  }
});


// api/categories GET: Fetch all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
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
