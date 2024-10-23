// routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adsfasdgwe';
const authenticateUser = require('../middlewares/authenticateUser'); // Import authentication middleware
const { HttpStatusCode } = require('axios');

const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      return res.status(HttpStatusCode.BadRequest).json({ "message": "This email is already registered."})
    }
    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    return res.status(HttpStatusCode.Created).json({"message": "Registration is successful."});
  } catch (e) {
    return res.status(422).json(e);
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
