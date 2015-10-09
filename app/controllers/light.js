var router = require('express').Router(),
  Light = require('../models/light'),
  light = new Light();

module.exports = function (app) {
  app.use('/', router);
};

router.route('/light')

  .get(function (req, res) {
    light.get().then(function (data) {
      res.format({
        html: function () {
          res.render('light', data);
        },
        json: function () {
          res.json(data);
        }
      });
    });
  })

  .put(function(req, res) {
    light.save(req.body).then(function (data) {
      res.format({
        html: function () {
          res.redirect('/light');
        },
        json: function () {
          res.json(data);
        }
      });
    });
  });
