var express = require('express'),
  router = express.Router(),
  Camshoot = require('../models/camshoot'),
  cam = new Camshoot();

module.exports = function (app) {
  app.use('/', router);
};

router.route('/image')

  .get(function (req, res) {
    res.type('png');
    cam.capture(function (result) {
      result.pipe(res);
    });
  });
