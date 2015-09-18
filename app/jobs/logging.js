var Logger = require('../../lib/logger'),
  logger = new Logger();

module.exports = function(agenda) {
  agenda.define('logging', function(job, done) {
    logger.logAll();
    done();
  });
};
