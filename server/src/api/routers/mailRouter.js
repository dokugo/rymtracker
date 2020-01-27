const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');
const { privateRoute } = require('../../helpers/utils');

router.get('/everyone', privateRoute, mailController.everyone);
router.get('/:email', privateRoute, mailController.specified);

module.exports = router;
