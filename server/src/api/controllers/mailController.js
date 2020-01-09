const User = require('../../models/user');
const mailer = require('../../services/mailer');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const massMail = async () => {
  const responseMessages = [];

  const users = await User.find();

  for (let i = 0; i < users.length; i++) {
    // const item = releases.find(item => item.username === users[i].username);

    if (!users[i].isVerified) {
      const message = `${users[i].email}: email is not verified.`;
      responseMessages.push(message);
      console.log(message);
      continue;
    }

    const releases = users[i].data && users[i].data.releases;
    if (releases) {
      const message = `${users[i].email}: mailing successfully processed.`;
      responseMessages.push(message);
      console.log(message);

      await sleep(1000);
      await mailer(users[i], 'releases');
    } else {
      const message = `${users[i].email}: no crawled data.`;
      responseMessages.push(message);
      console.log(message);
    }
  }

  return responseMessages;
};

const singleMail = async user => {
  await sleep(1000);
  await mailer(user, 'releases');
};

// send a email to every subscribed user
exports.everyone = async (request, response) => {
  try {
    // refactor the db query here

    // const users = await User.find();
    // const releases = await Release.find();

    // await massMail(users, releases);
    const responseMessages = await massMail();

    response.status(200).send({ message: responseMessages });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// send a mail to specified user
exports.specified = async (request, response) => {
  try {
    const email = request.params.id;

    // refactor the db query here
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (user) {
      const releases = user.data && user.data.releases;
      const error = user.data && user.data.error;

      if (!releases) {
        return response
          .status(400)
          .send({ message: `No crawled data for ${user.username}.` });
      }

      if (error) {
        return response.status(400).send({ message: error });
      }

      if (!user.isVerified) {
        return response
          .status(400)
          .send({ message: `${user.email} is not verified.` });
      }

      await singleMail(user);
      response.status(200).send({ message: `Email sent to ${email}` });
    } else {
      response.status(200).send({ message: 'No subscriptions.' });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
