var influx = require('influx'),
  dht = require('./lib/dht'),
  moisture = require('./lib/moisture'),
  config = require('./config/config'),
  client = influx(config.influx);

var Logger = function () {
}

Logger.prototype.logAll = function () {
  self = this;
  self.logDht(function (result) {
    console.log(result);
    self.logMoisture( function (result) {
      console.log(result);
    });
  });
}

Logger.prototype.logDht = function (callback) {
  if (dht) {
    dht.getData(function (readout) {
      var time = new Date();
      var data = {
        'temperature': [[{value: readout.temperature, time: time}]],
        'humidity': [[{value: readout.humidity, time: time}]]
      };

      client.writeSeries(data, function(error, response) {
        if (error) {
          callback(error);
        } else {
          callback(JSON.stringify(data));
        }
      });
    });
  }
}

Logger.prototype.logMoisture = function (callback) {
  if (moisture) {
    moisture.getData(function (readout) {
      var time = new Date();
      var data = {
        'moisture': [[{value: readout.moisture, time: time}]]
      };

      client.writeSeries(data, function(error, response) {
        if (error) {
          callback(error);
        } else {
          callback(JSON.stringify(data));
        }
      });
    });
  }
}

var logger = new Logger();
logger.logAll();
