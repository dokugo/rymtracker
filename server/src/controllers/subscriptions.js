const express = require('express');
const router = express.Router();

const User = require('../models/user');

// GET all users subscriptions
router.get('/subscriptions', async (request, response) => {
  try {
    const users = await User.find();

    if (users.length) {
      response.status(200).send(users);
    } else {
      response.status(200).send({ message: 'No subscriptions.' });
    }
  } catch (error) {
    console.log(error);
  }
});

// GET specified user subscriptions
router.get('/subscriptions/:id', async (request, response) => {
  try {
    const email = request.params.id;
    const user = await User.findOne({ email: email });

    if (user) {
      response.status(200).send(user);
    } else {
      response.status(200).send({ message: 'No subscriptions.' });
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
      return response.status(400).send({ error: 'Data missing.' });
    }

    const foundUser = await User.findOne({
      // username: body.username,
      email: body.email
    });

    if (foundUser && foundUser.username === body.username) {
      return response.status(200).send({ error: 'Duplicate.' });
    }

    if (foundUser) {
      await foundUser.updateOne({
        username: body.username
      });
      return response.status(200).send({
        message: `Updated ${body.email} subscription from ${foundUser.username} to ${body.username}`
      });
    }

    const user = new User({
      username: body.username,
      email: body.email,
      isVerified: false
    });

    await user.save();
    response.status(200).send({
      message: `Saved ${body.email} subscription to ${body.username}`
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// GET verify specified user
router.get('/subscriptions/verify/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const user = await User.findById(id);

    if (!user) {
      return response.status(200).send({ message: 'No such user.' });
    }

    if (user.isVerified) {
      response.status(200).send({ message: 'This email is already verified.' });
    } else {
      await user.updateOne({ isVerified: true });
      response.status(200).send({ message: 'Verification succesful.' });
    }
  } catch (error) {
    console.log(error);
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
        .send({ message: 'Succesfully deleted.', user: deletedUser });
    } else {
      response.status(400).send({ error: 'No such user.' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
