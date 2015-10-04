var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  agenda = require('./app/agenda'),
  morgan = require('morgan'),
  methodOverride = require('method-override');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var app = express();
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

// Agenda jobs
agenda.every('1 minute', 'logging');
