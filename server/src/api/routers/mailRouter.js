const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mailController');

router.get('/everyone', mailController.everyone);
router.get('/:email', mailController.specified);

module.exports = router;
