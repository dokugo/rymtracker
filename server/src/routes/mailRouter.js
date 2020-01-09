const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mailController');

router.get('/everyone', mailController.everyone);
router.get('/:id', mailController.specified);

module.exports = router;
