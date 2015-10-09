var express = require('express'),
  router = express.Router(),
  Dht = require('../../lib/dht'),
  dht = new Dht(),
  Moisture = require('../../lib/moisture'),
  moisture = new Moisture(),
  Light = require('../models/light'),
  light = new Light(),
  Switch = require('../models/switch'),
  fan = new Switch(14, true),
  pump = new Switch(18);

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Promise.all([
    dht.getData(),
    moisture.getData()
  ]).then(function (result) {
    res.render('index', {
      dht: result[0],
      moisture: result[1],
      light: light.getStatus(),
      fan: fan.getStatus(),
      pump: pump.getStatus()
    });
  }).catch(function (error) {
    return next(error);
  });
});
