const express = require('express');
const router = express.Router();

const User = require('../models/user');

// GET all users subscriptions
router.get('/subscriptions', async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

// GET specified user subscriptions
router.get('/subscriptions/:id', async (request, response) => {
  try {
    const email = request.params.id;
    const subscriptions = await User.find({ email: email });

    if (subscriptions.length) {
      response.status(200).send(subscriptions);
    } else {
      response.status(200).send({ message: 'no subscriptions' });
    }
  } catch (error) {
    console.log(error);
  }
});

// POST subscribe user
router.post('/subscribe', async (request, response) => {
  try {
    const body = request.body;

    if (body.username === undefined || body.email === undefined) {
      return response.status(400).send({ error: 'data missing' });
    }

    const foundUser = await User.findOne({
      username: body.username,
      email: body.email
    });

    if (foundUser) {
      return response.status(400).send({ error: 'duplicate' });
    } else {
      const user = new User({
        username: body.username,
        email: body.email
      });

      const savedUser = await user.save();
      response.status(200).send(savedUser);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// DELETE user subscription
router.delete('/unsubscribe', async (request, response) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: request.query.username,
      email: request.query.email
    });

    if (deletedUser) {
      response
        .status(200)
        .send({ message: 'succesfully deleted', user: deletedUser });
    } else {
      response.status(400).send({ error: 'no such user' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
