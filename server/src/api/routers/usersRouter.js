const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.put('/subscribe', usersController.subscribe);
router.get('/everyone', usersController.everyone);
router.get('/:email', usersController.specified);
router.get('/verify/:id', usersController.verify);
router.get('/unsubscribe/:id', usersController.unsubscribe);
router.get('/update/:id/:username', usersController.update);

module.exports = router;
