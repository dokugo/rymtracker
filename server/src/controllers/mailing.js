const express = require('express');
const router = express.Router();

const mailer = require('../services/mailer');

const User = require('../models/user');

const sendmail = async users => {
  for (let i = 0; i < users.length; i++) {
    await mailer(users[i]);
  }
};

// GET ping to massmail route to send a email to every subscribed user
router.get('/massmail', async (request, response) => {
  try {
    const users = await User.find({});
    sendmail(users);
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
