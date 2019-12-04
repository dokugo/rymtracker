const express = require('express');
const router = express.Router();

const mailer = require('../services/mailer');

const Release = require('../models/release');
const User = require('../models/user');

const sendmail = async (users, releases) => {
  for (let i = 0; i < 1; i++) {
    await mailer(users[i], releases[i].data);
  }
};

// GET ping to massmail route to send a email to every subscribed user
router.get('/massmail', async (request, response) => {
  try {
    const users = await User.find({});
    const releases = await Release.find({});

    sendmail(users, releases);
    response.status(200).send({ message: 'emails sent' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
