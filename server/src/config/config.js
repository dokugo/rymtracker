require('dotenv').config();

const config = {
  app: {
    port: 9000
  },
  db: {
    uri: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  smtp: {
    host: process.env.SMTP_HOST_DEV || process.env.SMTP_HOST_PROD,
    user: process.env.SMTP_USER_DEV || process.env.SMTP_USER_PROD,
    password: process.env.SMTP_PASS_DEV || process.env.SMTP_PASS_PROD
  }
};

module.exports = config;
