const router = require('express').Router();
const verify = require('../auth-guard/verifyToken');

router.get('/', verify, async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
