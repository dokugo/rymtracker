const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { clientRoute, emailRoute } = require('../../helpers/utils');

router.put('/subscribe', clientRoute, usersController.subscribe);
router.get('/everyone', emailRoute, usersController.everyone);
router.get('/:email', emailRoute, usersController.specified);
router.get('/verify/:id', emailRoute, usersController.verify);
router.get('/unsubscribe/:id', emailRoute, usersController.unsubscribe);
router.get('/update/:id/:username', emailRoute, usersController.update);

module.exports = router;
