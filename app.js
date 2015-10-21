var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  Planner = require('./lib/planner'),
  methodOverride = require('method-override'),
  Light = require('./app/models/light');

var app = express();
app.use(methodOverride('_method'));

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

var planner = new Planner();
  light = new Light();

planner.addJob('1 minute', 'logging');
planner.getLightPeriod().then(function (status) {
  if (status) {
    light.on();
  } else {
    light.off();
  }
});
