const { API_KEY_PUBLIC, API_KEY_PRIVATE } = require('../config/config');

exports.notFound404 = (request, response) => {
  response.status(404).send({ message: `Unknown endpoint.` });
};

exports.publicRoute = (request, response, next) => {
  if (request.headers[`x-api-key`] !== API_KEY_PUBLIC) {
    return response
      .status(401)
      .send({ message: `Access denied.`, error: true });
  }
  next();
};

exports.privateRoute = (request, response, next) => {
  if (request.headers[`x-api-key`] !== API_KEY_PRIVATE) {
    return response
      .status(401)
      .send({ message: `Access denied.`, error: true });
  }
  next();
};

exports.errorHandler = (error, request, response, next) => {
  console.error(error.message);
  return response
    .status(500)
    .send({ message: `Internal server error.`, error: true });
};
