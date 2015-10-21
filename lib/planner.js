var agenda = require('./agenda');

var Planner = function () {
};

Planner.prototype.addJob = function (interval, job) {
  agenda.every(interval, job);
};

Planner.prototype.getLightJobs = function () {
  return new Promise(function (resolve, reject) {
    agenda.jobs({name: /light/}, function (error, jobs) {
      if (error) {
        reject(error);
      }
      var data = {
        lightOn: '',
        lightOff: ''
      };
      for (var job of jobs) {
        if (job.attrs.name === 'lightOn') {
          data.lightOn = job.attrs;
        } else if (job.attrs.name === 'lightOff') {
          data.lightOff = job.attrs;
        }
      }
      resolve(data);
    });
  });
};

Planner.prototype.setLightJobs = function (data) {
  if (data.lightOn) {
    agenda.every(data.lightOn, 'lightOn');
  }
  if (data.lightOff) {
    agenda.every(data.lightOff, 'lightOff');
  }
  return this.getLightJobs();
};

Planner.prototype.getLightPeriod = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.getLightJobs().then(function (jobs) {
      var now = new Date(),
        nowTime = now.getHours() + now.getMinutes() / 60,
        nextOn = new Date(jobs.lightOn.nextRunAt),
        nextOnTime = nextOn.getHours() + nextOn.getMinutes() / 60,
        nextOff = new Date(jobs.lightOff.nextRunAt),
        nextOffTime = nextOff.getHours() + nextOff.getMinutes() / 60;

      if (nextOnTime < nowTime) {
        nextOnTime += 24;
      }
      if (nextOffTime < nowTime) {
        nextOffTime += 24;
      }

      var nextOnDiff = nextOnTime - nowTime,
        nextOffDiff = nextOffTime - nowTime;

      if (nextOnDiff < nextOffDiff) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = Planner;
