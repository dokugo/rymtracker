const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } = require('../config/config');

const limitedRequestsHandler = (req, res) => {
  res.status(429).send({
    message: `Too many requests. Please try again after ${windowS} seconds`
  });
};

const windowS = RATE_LIMIT_WINDOW; // seconds

const options = {
  windowMs: windowS * 1000, // milliseconds
  max: RATE_LIMIT_MAX, // limit each IP to RATE_LIMIT_MAX requests per windowMs
  skipFailedRequests: true,
  handler: limitedRequestsHandler
};

const limiter = rateLimit(options);

module.exports = limiter;
