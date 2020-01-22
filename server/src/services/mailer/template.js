const ejs = require('ejs');
const path = require('path');

const template = {
  getSubject(type, user) {
    let subject;
    switch (type) {
      case 'releases':
        subject = `💿 Upcoming releases for ${user.username}`;
        break;
      case 'verification':
        subject = `❓ Please confirm subscription to ${user.username}`;
        break;
      case 'update':
        subject = `❓ Please confirm subscription update to ${user.username}`;
        break;
      case 'greeting':
        subject = `✔️ Verification successful`;
        break;
    }
    return subject;
  },

  async getHtml(user, type) {
    let templateDir, templateData;
    switch (type) {
      case 'releases':
        templateData = {
          user: user,
          data: user.data.releases
        };
        templateDir = path.join(__dirname, '../templates/releases.ejs');
        break;

      case 'verification':
        templateData = {
          user: user,
          link: `https://rymtracker.ml/users/verify/${user.id}`,
          text: ``
        };
        templateDir = path.join(__dirname, '../templates/verification.ejs');
        break;

      case 'update':
        templateData = {
          user: user,
          link: `https://rymtracker.ml/users/update/${user.id}/${user.username}`,
          text: `update`
        };
        templateDir = path.join(__dirname, '../templates/verification.ejs');
        break;

      case 'greeting':
        templateData = {
          user: user,
          link: `https://rymtracker.ml/user/unsubscribe/${user.id}`,
          text: `Hi, ${user.email}. The new releases list is being mailed to the subscribers on every Sunday, 18:00 GMT/UTC +0.`
        };
        templateDir = path.join(__dirname, '../templates/greeting.ejs');
        break;
    }

    const html = await ejs.renderFile(templateDir, templateData);
    return html;
  },

  getOptions(user, subject, html) {
    const options = {
      from: '"RYM Tracker" <no-reply@rymtracker.ml>',
      to: user.email,
      subject: subject,
      text: `Please use a client with HTML support.`,
      html: html
    };
    return options;
  },

  async generate(user, type) {
    const subject = this.getSubject(type, user);
    const html = await this.getHtml(user, type);
    const options = this.getOptions(user, subject, html);
    return options;
  }
};

module.exports = template;
