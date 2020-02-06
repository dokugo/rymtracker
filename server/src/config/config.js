const dotenv = require('dotenv');

const development = { path: `${__dirname}/.env.development` };
const production = { path: `${__dirname}/.env.production` };

if (process.env.NODE_ENV === 'development') {
  dotenv.config(development);
}
if (process.env.NODE_ENV === 'production') {
  dotenv.config(production);
}

module.exports = {
  // used in app.js
  APP_PORT: process.env.PORT || 9000,
  DB_URI: process.env.MONGODB_URI,
  DB_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },

  // used in middlewares/middlewares
  // used for client operations auth
  API_KEY_PUBLIC: process.env.API_KEY_PUBLIC,
  // used for inner server services operations auth (mass crawling, mailing)
  API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,

  // used in helpers/limiter
  RATE_LIMIT_WINDOW: 5, // seconds
  RATE_LIMIT_MAX: 10, // limit each IP to RATE_LIMIT_MAX requests per windowMs

  // used in services/mailer/mailer
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,

  // used in cron/cron
  CRON_TIME: '00 18 * * SUN',
  CRON_TIMEZONE: 'Europe/London',

  // used in services/mailer/template
  DOMAIN: process.env.DOMAIN || `http://localhost:3000`
};
