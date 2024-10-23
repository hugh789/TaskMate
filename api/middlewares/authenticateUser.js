// middlewares/authenticateUser.js
const { HttpStatusCode } = require('axios');
const jwt = require('jsonwebtoken');
const jwtSecret = 'adsfasdgwe'; // Fixed missing semicolon
const User = require('../models/User');
const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(HttpStatusCode.Unauthorized).json({ message: 'Please login first.' });
  }

  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      return res.status(HttpStatusCode.Unauthorized).json({ message: 'Invalid token.' });
    }

    // Find the user and ensure the token exists in their active sessions
    const userDoc = await User.findById(userData.id);
    if (!userDoc || !userDoc.tokens.includes(token)) {
      return res.status(HttpStatusCode.Unauthorized).json({ message: 'Invalid session.' });
    }

    req.user = userData;
    next();
  });
};

module.exports = authenticateUser;
