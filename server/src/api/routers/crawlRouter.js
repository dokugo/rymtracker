const express = require('express');
const router = express.Router();

const crawlController = require('../controllers/crawlController');

router.get('/', crawlController.everyone);
router.get('/:username', crawlController.specified);

module.exports = router;
