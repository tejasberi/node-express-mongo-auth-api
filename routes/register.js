/* eslint-disable comma-dangle */
const router = require('express').Router();
const resgisterController = require('../controllers/registerController');
const validations = require('../validations/validate');

router.post(
  '/',
  validations.validate('register'),
  resgisterController.register
);

module.exports = router;
