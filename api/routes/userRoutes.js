// routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adsfasdgwe';
const authenticateUser = require('../middlewares/authenticateUser'); // Import authentication middleware

const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
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
        jwt.sign({
          email: userDoc.email,
          id: userDoc._id
        }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('Password not ok');
      }
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
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
router.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

module.exports = router;
