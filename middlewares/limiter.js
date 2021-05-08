const rateLimit = require('express-rate-limit');

const { messages } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: messages.limiterError,
});

module.exports = limiter;
