const { body } = require('express-validator/check');

exports.validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('name', 'Invalid name').exists().isLength({ min: 6 }),
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isLength({ min: 6, max: 50 }),
      ];
    }

    case 'login': {
      return [
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isLength({ min: 6, max: 50 }),
      ];
    }
  }
};
