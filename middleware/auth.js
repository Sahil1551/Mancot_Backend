const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');

    if (!accessToken) {
      return res.status(401).json({ msg: 'Access Denied. Missing Authorization header' });
    }

    const token = accessToken.replace('Bearer ', ''); // Remove 'Bearer ' from token

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid Token. Authorization failed' });
      }
      
      // If token is valid, set decoded user information to req.user
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (err) {
    console.error('Authorization Error:', err);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = auth;
