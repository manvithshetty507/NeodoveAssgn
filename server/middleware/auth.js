const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from headers or body
  const {token, user} = req.body;
  
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'jwt_secret');

    // Attach user data to request object for further processing
    console.log("decoded:",decoded.user, "| user:", user);
    if(decoded.user == user) {
      next();
    }
    
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
