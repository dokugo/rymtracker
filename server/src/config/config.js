require('dotenv').config();

const config = {
  app: {
    port: 9000
  },
  db: {
    uri: process.env.MONGODB_URI
  },
  smtp: {
    prod: {
      host: process.env.SMTP_HOST_PROD,
      user: process.env.SMTP_USER_PROD,
      password: process.env.SMTP_PASS_PROD
    },
    dev: {
      host: process.env.SMTP_HOST_DEV,
      user: process.env.SMTP_USER_DEV,
      password: process.env.SMTP_PASS_DEV
    }
  }
};

module.exports = config;
