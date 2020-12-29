/* eslint-disable comma-dangle */
const bcrypt = require('bcryptjs');

// validations
const { validationResult } = require('express-validator');
const User = require('../model/User');

const register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // check for duplicate accounts
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400).send('email already exists');
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      // create new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });

      try {
        const savedUser = await user.save();
        res.send(savedUser);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  } else {
    res.status(400).send(errors);
  }
};

module.exports = { register };
