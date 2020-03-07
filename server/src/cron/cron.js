const CronJob = require('cron').CronJob;
const { CRON_TIME, CRON_TIMEZONE } = require('../config/config');
const { massCrawling } = require('../jobs/massCrawling');
const { massMailing } = require('../jobs/massMailing');

const weeklyJob = async () => {
  // write logs to disk or database

  console.log('Mass crawling started.');
  const crawlingLog = await massCrawling();
  console.log(crawlingLog);

  console.log('Mass mailing started.');
  const mailingLog = await massMailing();
  console.log(mailingLog);
};

const options = {
  cronTime: CRON_TIME,
  timeZone: CRON_TIMEZONE,
  onTick: weeklyJob
};

const cron = new CronJob(options);

module.exports = cron;
