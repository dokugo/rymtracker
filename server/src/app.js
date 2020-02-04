console.clear();

const { APP_PORT, DB_URI, DB_OPTIONS } = require('./config/config');
const limiter = require('./helpers/limiter');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./api/router');
const { errorHandler, notFound404 } = require('./middlewares/middlewares');

app.set('trust proxy', 1);
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.use(notFound404);

const listen = () => {
  app.listen(APP_PORT);
  console.log(`Server is listening on port ${APP_PORT}.`);
};

const connect = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen, console.log('Connected to the database.'));
  return mongoose.connect(DB_URI, DB_OPTIONS);
};

connect();
