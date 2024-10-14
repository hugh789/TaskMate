// middlewares/authenticateUser.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'adsfasdgwe'; // Fixed missing semicolon
const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (err, userData) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = userData; // Attach user data to the request
    next();
  });
};

module.exports = authenticateUser;
