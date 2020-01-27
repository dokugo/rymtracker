const express = require('express');
const router = express.Router();
const crawlController = require('../controllers/crawlController');
const { clientRoute, privateRoute } = require('../../helpers/utils');

router.get('/', privateRoute, crawlController.everyone);
router.get('/:username', clientRoute, crawlController.specified);

module.exports = router;
