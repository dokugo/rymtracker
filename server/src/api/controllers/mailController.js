const User = require('../../models/user');
const mailer = require('../../services/mailer/mailer');
const { mailingLoop } = require('../../jobs/massMailing');

// send a mail to every subscribed user
exports.everyone = async (request, response) => {
  const users = await User.find();

  if (!users) {
    return response.status(404).send({ message: `Subscriptions not found.` });
  }

  const mailingLog = await mailingLoop(users);
  response.status(200).send({ message: mailingLog });
};

// send a mail to specified user
exports.specified = async (request, response) => {
  if (!request.params.email) {
    return response.status(400).send({ message: `Data missing.` });
  }
  const email = request.params.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    return response
      .status(404)
      .send({ message: `${email}: subscription not found.` });
  }

  if (!user.isVerified) {
    return response
      .status(403)
      .send({ message: `${email}: email is not verified.` });
  }

  const error = user.data && user.data.error;
  const releases = user.data && user.data.releases;

  if (error) {
    return response.status(400).send({ message: error });
  }

  if (!releases) {
    return response.status(400).send({
      message: `${email}: no data found for ${user.username}.`
    });
  }

  await mailer(user, 'releases');
  response.status(200).send({ message: `${email}: mailing successful.` });
};
