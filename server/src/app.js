console.clear();

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;
// console.log('Connecting to', url);
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to the database.');
  })
  .catch(error => {
    console.log('Error connecting to the database: ', error.message);
  });

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

const users = require('./controllers/subscriptions');
const crawling = require('./controllers/crawling');
app.use('/user', users);
app.use('/crawl', crawling);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
