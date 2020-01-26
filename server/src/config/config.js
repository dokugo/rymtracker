require('dotenv').config();

module.exports = {
  // used in app.js
  APP_PORT: process.env.PORT || 9000,
  DB_URI: process.env.MONGODB_URI,
  DB_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },

  // used in helpers/limiter
  RATE_LIMIT_WINDOW: 5, // seconds
  RATE_LIMIT_MAX: 10, // limit each IP to RATE_LIMIT_MAX requests per windowMs

  // used in services/mailer/mailer
  SMTP_HOST: process.env.SMTP_HOST_DEV || process.env.SMTP_HOST_PROD,
  SMTP_USER: process.env.SMTP_USER_DEV || process.env.SMTP_USER_PROD,
  SMTP_PASS: process.env.SMTP_PASS_DEV || process.env.SMTP_PASS_PROD
};
