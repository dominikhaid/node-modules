/**
Timeing
    Seconds: 0-59
    Minutes: 0-59
    Hours: 0-23
    Day of Month: 1-31
    Months: 0-11 (Jan-Dec)
    Day of Week: 0-6 (Sun-Sat)
*/
const moment = require('moment');
var CronJob = require('cron').CronJob;

var job = new CronJob(
  '* * * * * *',
  function () {
    console.debug(`1s timing`);
    setTimeout(() => {
      console.debug(
        `Started: ${moment(job.lastDate()).format('DD.MM.YYYY hh:mm:ss')}`,
      );
    }, 500);
  },
  function () {
    console.debug('Job Stopped !');
  },
  true,
  'Europe/London',
  null,
  true,
);
job.addCallback(function () {
  console.debug(
    `${moment(job.lastDate()).format(
      'DD.MM.YYYY hh:mm:ss',
    )} finshed: next ${moment(job.nextDates()).fromNow()}`,
  );
});
job.start();

var job2 = new CronJob(
  '0 * * * * *',
  function () {
    console.debug(`60s`);
    setTimeout(() => {
      console.debug(
        `Started: ${moment(job.lastDate()).format('DD.MM.YYYY hh:mm:ss')}`,
      );
    }, 500);
  },
  function () {
    console.debug('Job Stopped !');
  },
  true,
  'Europe/London',
  null,
  true,
);
job2.addCallback(function () {
  console.debug(
    `${moment(job.lastDate()).format(
      'DD.MM.YYYY hh:mm:ss',
    )} finshed: next ${moment(job.nextDates()).fromNow()}`,
  );
});
job2.start();

setTimeout(() => {
  job.stop();
  job2.stop();
  process.exit();
}, 65000);
