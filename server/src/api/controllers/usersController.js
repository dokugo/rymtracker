const User = require('../../models/user');
const mailer = require('../../services/mailer/mailer');
const { validateEmail } = require('../../helpers/utils');
const { validateUsername } = require('../../helpers/utils');

// subscribe user
exports.subscribe = async (request, response) => {
  try {
    let { body } = request;

    if (body.username === undefined || body.email === undefined) {
      return response.status(400).send({ message: `Data missing.` });
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

    const foundUser = await User.findOne({
      email: body.email
    });

    // handle duplicate
    if (foundUser && foundUser.username === body.username) {
      if (!foundUser.isVerified) {
        await mailer(foundUser, 'verification');

        return response.status(409).send({
          message: `${body.email}: duplicate, please confirm subscription via email verification link.`
        });
      }
      return response
        .status(409)
        .send({ message: `${body.email} + ${body.username}: duplicate` });
    }

    // handle update
    if (foundUser && foundUser.username !== body.username) {
      const newUser = {
        id: foundUser.id,
        email: foundUser.email,
        username: body.username
      };

      await mailer(newUser, 'update');

      return response.status(200).send({
        message: `${body.email}: please confirm subscription update via email verification link.`
      });
    }

    // handle save
    const user = new User({
      username: body.username,
      email: body.email,
      isVerified: false
    });

    await user.save();

    await mailer(user, 'verification');

    response.status(201).send({
      message: `${body.email}: please confirm subscription via email verification link.`
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get all users
exports.everyone = async (request, response) => {
  try {
    const users = await User.find();

    if (users.length) {
      response.status(200).send({ message: users });
    } else {
      response.status(404).send({ message: `Subscriptions not found.` });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get specified user
exports.specified = async (request, response) => {
  try {
    const email = request.params.email;
    const user = await User.findOne({ email: email });

    if (user) {
      response.status(200).send({ message: user });
    } else {
      response
        .status(404)
        .send({ message: `${email}: subscription not found.` });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// verify specified user
exports.verify = async (request, response) => {
  try {
    if (!request.query.email || !request.query.id) {
      return response.status(400).send({ message: `Data missing.` });
    }

    const user = await User.findById(request.query.id).catch(error =>
      console.error(error.message)
    );

    if (!user) {
      return response.status(404).send({ message: `Subscription not found.` });
    }

    if (user.email !== request.query.email) {
      return response.status(400).send({
        message: `${user.email}: the provided email does not match the id.`
      });
    }

    if (user.isVerified) {
      return response
        .status(400)
        .send({ message: `${user.email}: email is already verified.` });
    }

    await user.updateOne({ isVerified: true });
    await mailer(user, 'greeting');
    response
      .status(200)
      .send({ message: `${user.email}: verification succesful.` });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// unsubscribe user
exports.unsubscribe = async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id);

    if (deletedUser) {
      response
        .status(200)
        .send({ message: `${deletedUser.email}: unsubscribe successful.` });
    } else {
      response.status(404).send({ message: `Subscription not found.` });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// update user
exports.update = async (request, response) => {
  try {
    const newUsername = request.params.username;
    const user = await User.findById(request.params.id);

    if (user && user.username === newUsername) {
      return response
        .status(409)
        .send({ message: `${user.email} + ${newUsername}: duplicate` });
    }

    if (user && user.username !== newUsername) {
      await user.updateOne({
        username: newUsername
      });
      return response.status(200).send({
        message: `${user.email}: update to ${user.username} successful.`
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
