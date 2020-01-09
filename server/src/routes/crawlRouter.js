const express = require('express');
const router = express.Router();

const crawlController = require('../controllers/crawlController');

router.get('/everyone', crawlController.everyone);
router.get('/:id', crawlController.specified);

module.exports = router;
