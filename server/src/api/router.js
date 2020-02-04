const express = require('express');
const router = express.Router();
const usersRouter = require('./routes/usersRouter');
const crawlRouter = require('./routes/crawlRouter');
const mailRouter = require('./routes/mailRouter');

router.use('/users', usersRouter);
router.use('/crawl', crawlRouter);
router.use('/mail', mailRouter);

module.exports = router;
