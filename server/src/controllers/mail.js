const express = require('express');
const router = express.Router();

const mailer = require('../services/mailer');

const Release = require('../models/release');
const User = require('../models/user');

const massMail = async (users, releases) => {
  for (let i = 0; i < users.length; i++) {
    const item = releases.find(item => item.username === users[i].username);
    if (item.data) {
      await mailer(users[i], 'releases', item.data);
    } else {
      console.log(`No crawled data for ${users[i].username}.`);
    }
  }
};

const singleMail = async (user, release) => {
  await mailer(user, 'releases', release.data);
};

// GET send a email to every subscribed user
router.get('/mass', async (request, response) => {
  try {
    // refactor the db query here
    const users = await User.find();
    const releases = await Release.find();

    await massMail(users, releases);

    response.status(200).send({ message: 'Mass mailing successful.' });
  } catch (error) {
    console.log(error);
  }
});

// GET send a mail to specified user
router.get('/:id', async (request, response) => {
  try {
    const email = request.params.id;

    // refactor the db query here
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (user) {
      const release = await Release.findOne({ username: user.username });

      if (!release) {
        return response
          .status(400)
          .send({ error: `No crawled data for ${user.username}.` });
      }
      if (release.error) {
        return response.status(400).send({ message: release.error });
      }

      await singleMail(user, release);
      response.status(200).send({ message: `Email sent to ${email}` });
    } else {
      response.status(200).send({ message: 'No subscriptions.' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
