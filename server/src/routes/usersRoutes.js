const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

router.get('/everyone', userController.everyone);
router.get('/:id', userController.specified);
router.get('/verify/:id', userController.verify);
router.get('/unsubscribe/:id', userController.unsubscribe);
router.get('/update/:id/:username', userController.update);

router.put('/subscribe', userController.subscribe);

module.exports = router;
