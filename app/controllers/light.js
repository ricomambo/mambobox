var router = require('express').Router(),
  agenda = require('../agenda'),
  Light = require('../../lib/light'),
  light = new Light();

module.exports = function (app) {
  app.use('/', router);
};

router.route('/light')

  .get(function (req, res) {
    var data = {
      status: light.getStatus(),
      jobs: {}
    };
    agenda.jobs({name: /light/}, function(err, jobs) {
      for (var job of jobs) {
        data.jobs[job.attrs.name] = job.attrs;
      }
      res.render('light', data);
    });
  })

  .put(function(req, res) {
    console.log(req.body);
    if(req.body.status) {
      if(req.body.status == 'true') {
        light.on();
      } else if (req.body.status == 'false') {
        light.off();
      }
    }
    res.sendStatus(200);
  });
