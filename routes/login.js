/* eslint-disable comma-dangle */
const router = require('express').Router();
const loginController = require('../controllers/loginController');
const validations = require('../validations/validate');

router.post('/', validations.validate('login'), loginController.login);

module.exports = router;
