const ejs = require('ejs');
const path = require('path');
const { DOMAIN } = require('../../config/config');

const template = {
  getSubject(user, type) {
    this.subjects = {
      verification: `❓ Please confirm subscription to ${user.username}`,
      update: `❓ Please confirm subscription update to ${user.username}`,
      greeting: `✔️ Verification successful`,
      releases: `💿 Upcoming releases for ${user.username}`
    };
    return this.subjects[type];
  },

  async getHtml(user, type) {
    const paramsString = `?id=${user.id}&email=${user.email}&username=${user.username}`;

    this.options = {
      verification: {
        templateDir: path.join(__dirname, '../../templates/verification.ejs'),
        templateData: {
          user: user,
          link: `${DOMAIN}/verification${paramsString}`,
          text: ``
        }
      },

      update: {
        templateDir: path.join(__dirname, '../../templates/verification.ejs'),
        templateData: {
          user: user,
          link: `${DOMAIN}/update${paramsString}`,
          text: `update`
        }
      },

      greeting: {
        templateDir: path.join(__dirname, '../../templates/releases.ejs'),
        templateData: {
          user: user,
          link: `${DOMAIN}/unsubscribe${paramsString}`,
          text: `Hi, ${user.username}. The new releases list is being mailed to the subscribers on every Sunday, 18:00 GMT/UTC +0.`
        }
      },

      releases: {
        templateDir: path.join(__dirname, '../../templates/releases.ejs'),
        templateData: {
          user: user,
          link: `${DOMAIN}/unsubscribe${paramsString}`,
          text: `Hi, ${user.username}. This is your weekly RYM releases list.`
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
