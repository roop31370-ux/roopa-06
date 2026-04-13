const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if header exists
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, access denied' });
  }

  // extract token (remove "Bearer ")
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("TOKEN ERROR:", err);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;