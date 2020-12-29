/* eslint-disable comma-dangle */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// validations
const { validationResult } = require('express-validator');
const User = require('../model/User');
const validations = require('../validations/validate');

router.post('/register', validations.validate('register'), async (req, res) => {
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
});

router.post('/login', validations.validate('login'), async (req, res) => {
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
});

module.exports = router;
