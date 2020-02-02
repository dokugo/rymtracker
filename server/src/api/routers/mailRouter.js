const express = require('express');
const router = express.Router();
const { everyone, specified } = require('../controllers/mailController');

const {
  privateRoute,
  asyncTryCatch
} = require('../../middlewares/middlewares');

router.get('/', privateRoute, asyncTryCatch(everyone));
router.get('/:email', privateRoute, asyncTryCatch(specified));

module.exports = router;
