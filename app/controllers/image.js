var express = require('express'),
  router = express.Router(),
  Camera = require('../models/camera'),
  cam = new Camera();

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
