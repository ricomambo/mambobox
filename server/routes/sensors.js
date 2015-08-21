var express = require('express');
var router = express.Router();
var dht = require('../lib/dht');

/* GET sensors listing. */
router.get('/', function(req, res, next) {
  res.json(
    { sensors: [
      {
        'name': 'dht',
        'messurements': {
          'temperature': dht.getTemperature(),
          'humidity': dht.getHumidity()
        }
      }
    ]}
  );
});

router.get('/dht', function(req, res, next) {
  res.json(
    {
      'name': 'dht',
      'messurements': {
        'temperature': dht.getTemperature(),
        'humidity': dht.getHumidity()
      }
    }
  );
});

module.exports = router;
