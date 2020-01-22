const User = require('../../models/user');
const mailer = require('../../services/mailer/mailer');
const { sleep } = require('../../helpers/utils');

const massMail = async () => {
  const messagesArray = [];

  const users = await User.find();

  for (let i = 0; i < users.length; i++) {
    if (!users[i].isVerified) {
      const message = `${users[i].email}: email is not verified.`;
      messagesArray.push(message);
      console.log(message);
      continue;
    }

    const releases = users[i].data && users[i].data.releases;
    if (releases && releases.length) {
      const message = `${users[i].email}: mailing successful.`;
      messagesArray.push(message);
      console.log(message);

      await sleep(1000);
      await mailer(users[i], 'releases');
    } else {
      const message = `${users[i].email}: no data found for ${users[i].username}.`;
      messagesArray.push(message);
      console.log(message);
    }
  }

  return messagesArray;
};

// send a mail to every subscribed user
exports.everyone = async (request, response) => {
  try {
    const responseMessage = await massMail();
    response.status(200).send({ message: responseMessage });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// send a mail to specified user
exports.specified = async (request, response) => {
  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
