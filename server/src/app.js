console.clear();

require('dotenv').config();

const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to the database.');
  })
  .catch(error => {
    console.log('Error connecting to the database: ', error.message);
  });

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const usersRouter = require('./api/routers/usersRouter');
const crawlRouter = require('./api/routers/crawlRouter');
const mailRouter = require('./api/routers/mailRouter');
app.use('/users', usersRouter);
app.use('/crawl', crawlRouter);
app.use('/mail', mailRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'Unknown endpoint.' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
