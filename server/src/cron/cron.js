const CronJob = require('cron').CronJob;
const { CRON_TIME, CRON_TIMEZONE } = require('../config/config');
const massCrawling = require('../jobs/massCrawling');
const massMailing = require('../jobs/massMailing');

const weeklyJob = async () => {
  console.log('Mass crawling started.');
  await massCrawling();
  console.log('Mass mailing started.');
  await massMailing();
};

const options = {
  cronTime: CRON_TIME,
  timeZone: CRON_TIMEZONE,
  onTick: weeklyJob
};

const cron = new CronJob(options);

module.exports = cron;
