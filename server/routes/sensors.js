var express = require('express');
var router = express.Router();
var dht = require('../lib/dht');

/* GET sensors listing. */
router.get('/', function(req, res, next) {
  res.json(
    [
      {
        'name': 'dht',
        'measurements': [
          {
            'name': 'temperature',
            'value': dht.getTemperature()
          },
          {
            'name': 'humidity',
            'value': dht.getHumidity()
          }
        ]
      }
    ]
  );
});

router.get('/dht', function(req, res, next) {
  res.json(
    {
      'name': 'dht',
      'measurements': [
          {
            'name': 'temperature',
            'value': dht.getTemperature()
          },
          {
            'name': 'humidity',
            'value': dht.getHumidity()
          }
        ]
    }
  );
});

module.exports = router;
