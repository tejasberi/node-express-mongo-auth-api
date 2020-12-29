const router = require('express').Router();
const verify = require('../auth-guard/verifyToken');
const dataController = require('../controllers/dataController');

router.get('/', verify, dataController.data);

module.exports = router;
