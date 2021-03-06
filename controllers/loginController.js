/* eslint-disable comma-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// validations
const { validationResult } = require('express-validator');
const User = require('../model/User');

const login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // check for valid password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        // create JWT
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
        res.status(200).send({ message: 'Login successful' });
      } else {
        res.status(400).send({ message: 'Invalid usename or password' });
      }
    } else {
      res.status(400).send({ message: 'User does not exist' });
    }
  } else {
    res.status(400).send(errors);
  }
};

module.exports = { login };
