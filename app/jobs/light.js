var Logger = require('../../lib/logger'),
  logger = new Logger();
  Light = require('../models/light'),
  light = new Light();

module.exports = function (agenda) {
  agenda.define('lightOn', function (job, done) {
    light.on();
    logger.logData({light: 1})
      .then(console.log, console.log);
    done();
  });
  agenda.define('lightOff', function (job, done) {
    light.off();
    logger.logData({light: 0})
      .then(console.log, console.log);
    done();
  });
};
