const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { publicRoute, privateRoute } = require('../../middlewares/middlewares');

router.get('/', privateRoute, usersController.everyone);
router.put('/subscribe', publicRoute, usersController.subscribe);
router.patch('/verification', publicRoute, usersController.verification);
router.patch('/update', publicRoute, usersController.update);
router.delete('/unsubscribe', publicRoute, usersController.unsubscribe);
router.get('/:email', privateRoute, usersController.specified);

module.exports = router;
