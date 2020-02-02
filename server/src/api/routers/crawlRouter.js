const express = require('express');
const router = express.Router();
const { everyone, specified } = require('../controllers/crawlController');

const {
  publicRoute,
  privateRoute,
  asyncTryCatch
} = require('../../middlewares/middlewares');

router.get('/', privateRoute, asyncTryCatch(everyone));
router.get('/:username', publicRoute, asyncTryCatch(specified));

module.exports = router;
