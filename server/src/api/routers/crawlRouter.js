const express = require('express');
const router = express.Router();
const crawlController = require('../controllers/crawlController');
const { publicRoute, privateRoute } = require('../../middlewares/middlewares');

router.get('/', privateRoute, crawlController.everyone);
router.get('/:username', publicRoute, crawlController.specified);

module.exports = router;
