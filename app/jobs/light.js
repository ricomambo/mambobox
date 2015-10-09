module.exports = function (agenda) {
  agenda.define('lightOn', function (job, options, done) {
    options.light.on();
    done();
  });
  agenda.define('lightOff', function (job, options, done) {
    options.light.off();
    done();
  });
};
