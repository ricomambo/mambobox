var express = require('express'),
  router = express.Router(),
  Dht = require('../../lib/dht'),
  dht = new Dht(),
  Moisture = require('../../lib/moisture'),
  moisture = new Moisture(),
  Light = require('../../lib/light'),
  light = new Light(),  
  Switch = require('../../lib/switch'),
  fan = new Switch(14, true),
  pump = new Switch(18);

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var data = {
    title: 'MamboBox'
  };
  Promise.all([
    dht.getData(),
    moisture.getData()
  ]).then(function (result) {
    data.dht = result[0];
    data.moisture = result[1];
    data.light = light.status();
    data.fan = fan.status();
    data.pump = pump.status();
    res.render('index', data);
  }).catch(function (error) {
    return next(error);
  });
});
