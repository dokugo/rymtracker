const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { clientRoute, emailRoute } = require('../../helpers/utils');

router.put('/subscribe', clientRoute, usersController.subscribe);
router.get('/everyone', emailRoute, usersController.everyone);
router.get('/verify', emailRoute, usersController.verify);
router.get('/unsubscribe/:id', emailRoute, usersController.unsubscribe);
router.get('/update/:id/:username', emailRoute, usersController.update);
router.get('/:email', emailRoute, usersController.specified);

module.exports = router;
