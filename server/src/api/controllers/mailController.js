const User = require('../../models/user');
const mailer = require('../../services/mailer');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const massMail = async () => {
  const messagesArray = [];

  const users = await User.find();

  for (let i = 0; i < users.length; i++) {
    // const item = releases.find(item => item.username === users[i].username);

    if (!users[i].isVerified) {
      const message = `${users[i].email}: email is not verified.`;
      messagesArray.push(message);
      console.log(message);
      continue;
    }

    const releases = users[i].data && users[i].data.releases;
    if (releases) {
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
    const email = request.params.id;

    // refactor the db query here
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (user) {
      if (!user.isVerified) {
        return response
          .status(400)
          .send({ message: `${email}: email is not verified.` });
      }

      const releases = user.data && user.data.releases;
      const error = user.data && user.data.error;

      if (!releases) {
        return response.status(400).send({
          message: `${email}: no data found for ${user.username}.`
        });
      }

      if (error) {
        return response.status(400).send({ message: error });
      }

      await singleMail(user);
      response.status(200).send({ message: `${email}: mailing successful.` });
    } else {
      response.status(200).send({ message: `${email}: no subscriptions.` });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
