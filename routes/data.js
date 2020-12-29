const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const dataController = require('../controllers/dataController');

router.get('/', verify, dataController.data);

module.exports = router;
