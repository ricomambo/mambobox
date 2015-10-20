var config = require('../config/config'),
  Influx = require('influx'),
  influx = Influx(config.influx);

var Logger = function () {
};

Logger.prototype.logData = function (measurements, time) {
  time = time || this.time || new Date();
  var data = {};
  for (var measurement in measurements) {
    data[measurement] = [[{
      value: measurements[measurement],
      time: time
    }]]
  }

  return new Promise(function (resolve, reject) {
    influx.writeSeries(data, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(data));
      }
    });
  });
};

module.exports = Logger;
