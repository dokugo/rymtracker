const User = require('../../models/user');
const mailer = require('../../services/mailer/mailer');
const crawler = require('../../services/crawler/crawler');
const {
  validateEmail,
  validateUsername,
  validateId
} = require('../../helpers/utils');

// get all users
exports.everyone = async (request, response) => {
  const users = await User.find();

  if (!users.length) {
    return response.status(404).send({ message: `Subscriptions not found.` });
  }

  response.status(200).send({ message: users });
};

// subscribe user
exports.subscribe = async (request, response) => {
  let { body } = request;

  if (!body.username || !body.email) {
    return response.status(400).send({ message: `Missing data.` });
  }

  body = {
    email: request.body.email.trim().toLowerCase(),
    username: request.body.username.trim().toLowerCase()
  };

  // handle invalid email
  if (!validateEmail(body.email)) {
    return response
      .status(400)
      .send({ message: `${body.email}: incorrect email format.` });
  }

  // handle invalid username
  if (!validateUsername(body.username)) {
    return response
      .status(400)
      .send({ message: `${body.username}: incorrect username format.` });
  }

  const user = await User.findOne({ email: body.email });

  // handle save
  if (!user) {
    const newUser = await User.create(body.username, body.email);
    await mailer(newUser, 'verification');
    return response.status(201).send({
      message: `${body.email}: please confirm subscription via email verification link.`
    });
  }

  // handle duplicate
  if (user.username === body.username) {
    return response
      .status(409)
      .send({ message: `${body.email} + ${body.username}: duplicate` });
  }

  // handle unverified duplicate
  if (user.username === body.username && !user.isVerified) {
    await mailer(user, 'verification');
    return response.status(409).send({
      message: `${body.email} + ${body.username}: duplicate; please confirm subscription via email verification link.`
    });
  }

  // handle update
  if (user.username !== body.username) {
    const newUser = {
      id: user.id,
      email: user.email,
      username: body.username
    };
    await mailer(newUser, 'update');
    return response.status(200).send({
      message: `${body.email}: please confirm subscription update via email verification link.`
    });
  }
};

// verify specified user
exports.verification = async (request, response) => {
  if (!request.query.id || !request.query.email || !request.query.username) {
    return response.status(400).send({ message: `Missing data.` });
  }

  const validId = validateId(request.query.id);

  if (!validId) {
    return response
      .status(400)
      .send({ message: `${request.query.id}: Invalid ID.` });
  }

  let user = await User.findById(request.query.id);

  if (!user) {
    return response.status(404).send({
      message: `${request.query.id}: subscription with this ID not found.`
    });
  }

  if (user.email !== request.query.email) {
    return response.status(400).send({
      message: `${request.query.email}: the provided email does not match the id.`
    });
  }

  if (user.isVerified) {
    return response
      .status(400)
      .send({ message: `${user.email}: email is already verified.` });
  }

  if (!user.isVerified) {
    await user.verify();
    response
      .status(200)
      .send({ message: `${user.email}: verification succesful.` });
  }

  const data = await crawler(user.username);

  if (!data || data.error) {
    user = await User.saveCrawledData(null, user.email, data.error);
  } else {
    user = await User.saveCrawledData(data, user.email, null);
  }

  await mailer(user, 'greeting');
};

// update user
exports.update = async (request, response) => {
  if (!request.query.id || !request.query.email || !request.query.username) {
    return response.status(400).send({ message: `Missing data.` });
  }
  const validId = validateId(request.query.id);

  if (!validId) {
    return response
      .status(400)
      .send({ message: `${request.query.id}: Invalid ID.` });
  }

  const user = await User.findById(request.query.id);

  if (!user) {
    return response
      .status(404)
      .send({ message: `${request.query.email}: subscription not found.` });
  }

  if (user.email !== request.query.email) {
    return response.status(400).send({
      message: `${user.email}: the provided email does not match the id.`
    });
  }

  if (!user.isVerified) {
    return response
      .status(400)
      .send({ message: `${user.email}: email is not verified.` });
  }

  const newUsername = request.query.username;

  if (user.username === newUsername) {
    return response
      .status(409)
      .send({ message: `${user.email} + ${newUsername}: duplicate` });
  }

  if (user.username !== newUsername) {
    await user.updateOne({ username: newUsername });
    return response.status(200).send({
      message: `${user.email}: update to ${newUsername} successful.`
    });
  }
};

// unsubscribe user
exports.unsubscribe = async (request, response) => {
  if (!request.query.id || !request.query.email || !request.query.username) {
    return response.status(400).send({ message: `Missing data.` });
  }

  const validId = validateId(request.query.id);

  if (!validId) {
    return response
      .status(400)
      .send({ message: `${request.query.id}: Invalid ID.` });
  }

  const user = await User.findById(request.query.id);

  if (!user) {
    return response
      .status(404)
      .send({ message: `${request.query.email}: subscription not found.` });
  }

  if (user.email !== request.query.email) {
    return response.status(400).send({
      message: `${user.email}: the provided email does not match the id.`
    });
  }

  if (!user.isVerified) {
    return response
      .status(400)
      .send({ message: `${user.email}: email is not verified.` });
  }

  if (user) {
    await user.deleteOne();
    response
      .status(200)
      .send({ message: `${user.email}: unsubscribe successful.` });
  }
};

// get specified user
exports.specified = async (request, response) => {
  if (!request.params.email) {
    return response.status(400).send({ message: `Missing data.` });
  }

  const email = request.params.email;
  const user = await User.findOne({ email: email });

  if (user) {
    response.status(200).send({ message: user });
  } else {
    response.status(404).send({ message: `${email}: subscription not found.` });
  }
};
