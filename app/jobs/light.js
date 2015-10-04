var Light = require('../../lib/light'),
  light = new Light();

module.exports = function(agenda) {
  agenda.define('light-on', function(job, done) {
    light.on();
    done();
  });
  agenda.define('light-off', function(job, done) {
    light.off();
    done();
  });
};
