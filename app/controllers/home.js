var express = require('express'),
  router = express.Router(),
  Dht = require('../models/dht'),
  dht = new Dht(),
  Moisture = require('../models/moisture'),
  moisture = new Moisture(),
  Light = require('../models/light'),
  light = new Light(),
  Switch = require('../models/switch'),
  fan = new Switch(14, true),
  pump = new Switch(18),
  Camera = require('../models/camera'),
  cam = new Camera();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Promise.all([
    dht.getData(),
    moisture.getData(),
    cam.capture(__dirname + '/../../public/img/capture.jpg')
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
