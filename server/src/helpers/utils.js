const {
  Types: { ObjectId }
} = require('mongoose');

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

exports.validateId = id => ObjectId.isValid(id);
