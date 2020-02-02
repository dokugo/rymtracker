const express = require('express');
const router = express.Router();

const {
  everyone,
  subscribe,
  verification,
  update,
  unsubscribe,
  specified
} = require('../controllers/usersController');

const {
  publicRoute,
  privateRoute,
  asyncTryCatch
} = require('../../middlewares/middlewares');

router.get('/', privateRoute, asyncTryCatch(everyone));
router.put('/subscribe', publicRoute, asyncTryCatch(subscribe));
router.patch('/verification', publicRoute, asyncTryCatch(verification));
router.patch('/update', publicRoute, asyncTryCatch(update));
router.delete('/unsubscribe', publicRoute, asyncTryCatch(unsubscribe));
router.get('/:email', privateRoute, asyncTryCatch(specified));

module.exports = router;
