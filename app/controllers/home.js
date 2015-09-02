var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  dht = require('../../lib/dht'),
  moisture = require('../../lib/moisture');

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
    res.render('index', data);
  }).catch(function (error) {
    return next(error);
  });
});
