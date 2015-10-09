var util = require("util"),
  Switch = require('./switch'),
  agenda = require('../agenda');

var Light = function () {
  Switch.call(this, 15, true);
};
util.inherits(Light, Switch);

Light.prototype.get = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    var data = {
      status: self.getStatus(),
      jobs: {
        lightOn: {
          repeatInterval: '0 12 * * *'
        },
        lightOff: {
          repeatInterval: '0 0 * * *'
        }
      }
    };
    agenda.jobs({name: /light/}, function (err, jobs) {
      for (var job of jobs) {
        data.jobs[job.attrs.name] = job.attrs;
      }
      resolve(data);
    });
  });
};

Light.prototype.save = function (data) {
  var self = this;
  return new Promise(function (resolve, reject) {
    if (data.status) {
      self.on();
    } else {
      self.off();
    }
    if (data.lightOn) {
      agenda.every(data.lightOn, 'lightOn', { light: self });
    }
    if (data.lightOff) {
      agenda.every(data.lightOff, 'lightOff', { light: self });
    }
    resolve({
      status: self.getStatus()
    });
  });
};

module.exports = Light;
