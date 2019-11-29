console.clear();

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const rym = require('./crawler/rym');
const reduce = require('./helpers/helpers');
const sampleData = require('./sample.json');

const User = require('./models/user');
const Release = require('./models/release');

const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));

/* const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};
app.use(requestLogger); */

app.get('/rym/subscriptions', async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

app.get('/rym/subscriptions/:id', async (request, response) => {
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

app.post('/rym/subscribe', async (request, response) => {
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

app.delete('/rym/unsubscribe', async (request, response) => {
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

app.get('/rym/user/:id', async (request, response) => {
  try {
    if (request.params.id === 'test') {
      return response.status(200).send(sampleData);
    }

    const username = request.params.id;
    const rawData = await rym(username);
    const data = reduce(rawData);

    const release = new Release({
      username: username,
      data: data
    });

    const savedData = await release.save();
    response.status(200).send(savedData);

    // console.log(data);
    // response.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
