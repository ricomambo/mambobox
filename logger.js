var influx = require('influx'),
  dht = require('./lib/dht'),
  moisture = require('./lib/moisture'),
  config = require('./config/config'),
  client = influx(config.influx)
  time = new Date();

var Logger = function () {
};

Logger.prototype.logAll = function () {
  for (var promise of [this.logDht(), this.logMoisture()]) {
    promise.then(console.log).catch(console.log);
  }
};

Logger.prototype.logDht = function () {
  return new Promise(function (resolve, reject) {
    if (!dht) { reject(new Error('DHT sensor not available')); }
    dht.getData().then(function (readout) {
      if (!readout) { reject(new Error('Error reading DHT sensor')); }
      var data = {
        'temperature': [[{value: readout.temperature, time: time}]],
        'humidity': [[{value: readout.humidity, time: time}]]
      };
      client.writeSeries(data, function(error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.stringify(data));
        }
      });
    }).catch(function (error) {
      reject(error);
    });
  });
};

Logger.prototype.logMoisture = function () {
  return new Promise(function (resolve, reject) {
    if (!moisture) { reject(new Error('Moisture sensor not available')); }
    moisture.getMedian().then(function (readout) {
      if (!readout) { reject(new Error('Error reading Moisture sensor')); }
      var data = {
        'moisture': [[{value: readout.moisture, time: time}]]
      };
      client.writeSeries(data, function(error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.stringify(data));
        }
      });
    }).catch(function (error) {
      reject(error);
    });
  });
};

var logger = new Logger();
logger.logAll();
