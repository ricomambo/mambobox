var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  agenda = require('./app/agenda'),
  morgan = require('morgan'),
  methodOverride = require('method-override');

var app = express();
app.use(morgan('dev'));
app.use(methodOverride('_method'));

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

// Agenda jobs
agenda.start();
agenda.every('1 minute', 'logging');
