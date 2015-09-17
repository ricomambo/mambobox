var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Dht = require('../../lib/dht'),
  dht = new Dht(),
  Moisture = require('../../lib/moisture'),
  moisture = new Moisture(),
  Switch = require('../../lib/switch'),
  light = new Switch(14, true),
  fan = new Switch(15, true),
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
