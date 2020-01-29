const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');
const { privateRoute } = require('../../middlewares/middlewares');

router.get('/', privateRoute, mailController.everyone);
router.get('/:email', privateRoute, mailController.specified);

module.exports = router;
