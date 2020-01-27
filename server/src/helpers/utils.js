const {
  API_KEY_CLIENT,
  API_KEY_EMAIL,
  API_KEY_PRIVATE
} = require('../config/config');

exports.sleep = time => new Promise(resolve => setTimeout(resolve, time));

exports.validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

exports.validateUsername = username => {
  const regex = /^[\w_]*$/;
  const noForbiddenSymbols = regex.test(username);
  const notTooLong = username.length < 25;
  const notTooShort = username.length > 2;
  return noForbiddenSymbols && notTooLong && notTooShort;
};

exports.clientRoute = (request, response, next) => {
  if (request.query.apikey !== API_KEY_CLIENT) {
    return response
      .status(401)
      .send({ message: `Access denied.`, error: true });
  }
  next();
};

exports.emailRoute = (request, response, next) => {
  if (request.query.apikey !== API_KEY_EMAIL) {
    return response
      .status(401)
      .send({ message: `Access denied.`, error: true });
  }
  next();
};

exports.privateRoute = (request, response, next) => {
  if (request.query.apikey !== API_KEY_PRIVATE) {
    return response
      .status(401)
      .send({ message: `Access denied.`, error: true });
  }
  next();
};
