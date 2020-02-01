const ejs = require('ejs');
const path = require('path');

const template = {
  getSubject(user, type) {
    this.subjects = {
      releases: `💿 Upcoming releases for ${user.username}`,
      verify: `❓ Please confirm subscription to ${user.username}`,
      update: `❓ Please confirm subscription update to ${user.username}`,
      greeting: `✔️ Verification successful`
    };
    return this.subjects[type];
  },

  async getHtml(user, type) {
    this.options = {
      releases: {
        templateDir: path.join(__dirname, '../../templates/releases.ejs'),
        templateData: {
          user: user,
          data: user.data.releases
        }
      },

      verification: {
        templateDir: path.join(__dirname, '../../templates/verification.ejs'),
        templateData: {
          user: user,
          link: `https://rymtracker.ml/users/verification/${user.id}`,
          text: ``
        }
      },

      update: {
        templateDir: path.join(__dirname, '../../templates/verification.ejs'),
        templateData: {
          user: user,
          link: `https://rymtracker.ml/users/update/${user.id}/${user.username}`,
          text: `update`
        }
      },

      greeting: {
        templateDir: path.join(__dirname, '../../templates/greeting.ejs'),
        templateData: {
          user: user,
          link: `https://rymtracker.ml/user/unsubscribe/${user.id}`,
          text: `Hi, ${user.email}. The new releases list is being mailed to the subscribers on every Sunday, 18:00 GMT/UTC +0.`
        }
      }
    };

    const dir = this.options[type].templateDir;
    const data = this.options[type].templateData;
    const html = await ejs.renderFile(dir, data);
    return html;
  },

  getOptions(user, subject, html) {
    this.options = {
      from: '"RYM Tracker" <no-reply@rymtracker.ml>',
      to: user.email,
      subject: subject,
      text: `Please use a client with HTML support.`,
      html: html
    };
    return this.options;
  },

  async generate(user, type) {
    const subject = this.getSubject(user, type);
    const html = await this.getHtml(user, type);

    const options = this.getOptions(user, subject, html);
    return options;
  }
};

module.exports = template;
