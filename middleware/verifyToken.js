const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('No token');
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    return res.status(401).send('Invalid token');
  }
};

module.exports = auth;
