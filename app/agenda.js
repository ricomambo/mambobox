var config = require('../config/config'),
  glob = require('glob'),
  Agenda = require('agenda'),
  agenda = new Agenda({db:{address: config.db}});

var jobs = glob.sync(config.root + '/app/jobs/*.js');
jobs.forEach(function (job) {
  require(job)(agenda);
});
agenda.start();

module.exports = agenda;
