var Dht = require('../models/dht'),
  dht = new Dht(),
  Moisture = require('../models/moisture'),
  moisture = new Moisture(),
  Logger = require('../../lib/logger'),
  logger = new Logger();

module.exports = function(agenda) {
  agenda.define('logging', function(job, done) {
    dht.getData()
      .then(logger.logData)
      .then(console.log, console.log);
    moisture.getData()
      .then(logger.logData)
      .then(console.log, console.log);
    done();
  });
};
