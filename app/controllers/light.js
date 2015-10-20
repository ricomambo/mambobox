var router = require('express').Router(),
  Light = require('../models/light'),
  light = new Light(),
  agenda = require('../agenda');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/light')

  .get(function (req, res) {
    var data = light.get();
    data.jobs = {
      lightOn: {
        repeatInterval: '0 12 * * *'
      },
      lightOff: {
        repeatInterval: '0 0 * * *'
      }
    };
    agenda.jobs({name: /light/}, function (err, jobs) {
      for (var job of jobs) {
        data.jobs[job.attrs.name] = job.attrs;
      }

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
    if (req.body.lightOn) {
      agenda.every(req.body.lightOn, 'lightOn');
    }
    if (req.body.lightOff) {
      agenda.every(req.body.lightOff, 'lightOff');
    }
    data.jobs = {};
    agenda.jobs({name: /light/}, function (err, jobs) {
      for (var job of jobs) {
        data.jobs[job.attrs.name] = job.attrs;
      }

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
