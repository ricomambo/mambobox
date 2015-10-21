var router = require('express').Router(),
  Light = require('../models/light'),
  light = new Light(),
  Planner = require('../../lib/planner'),
  planner = new Planner();

module.exports = function (app) {
  app.use('/', router);
};

router.route('/light')

  .get(function (req, res) {
    var data = light.get();
    planner.getLightJobs().then(function (jobs) {
      data.jobs = jobs;
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
    var data = light.save(req.body);
    planner.setLightJobs(req.body).then(function (jobs) {
      data.jobs = jobs;
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
