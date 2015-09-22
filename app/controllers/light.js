var router = require('express').Router(),
  Light = require('../../lib/light'),
  light = new Light();

module.exports = function (app) {
  app.use('/', router);
};

router.route('/light')

  .get(function (req, res) {
    var data = {
      status: light.status()
    };
    res.json(data);
  })

  .put(function(req, res) {
    if(req.body.status == 'true') {
      light.on();
    } else {
      light.off();
    }
    res.send(200);
  });
