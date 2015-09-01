var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  dht = require('../../lib/dht'),
  moisture = require('../../lib/moisture');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  dht.getData(function (dhtData) {
    if (!dhtData) return next();
    moisture.getData(function (moistureData) {
      console.log(moistureData);
      if (!moistureData) return next();
      res.render('index', {
        title: 'MamboBox',
        dht: dhtData,
        moisture: moistureData
      });
    })
  });
});
