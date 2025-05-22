const jwt = require('jsonwebtoken'); // Though verifyToken abstracts it, good to be mindful
const User = require('../models/User');
const { verifyToken } = require('../utils/jwtUtils'); // Assuming jwtUtils.js is in utils

const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'Not authorized, token failed or expired' });
      }

      // 4. Attach user to request object
      // Fetch user from DB, excluding the password
      // Ensure 'userId' matches what's in your JWT payload from generateToken
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        // This case handles if a user was deleted after token issuance
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Authentication error:', error);
      // Catching potential errors from User.findById or other unexpected issues
      return res.status(401).json({ message: 'Not authorized, token processing error' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
