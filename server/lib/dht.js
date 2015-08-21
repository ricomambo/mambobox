if (process.arch === 'arm') {
  var sensorLib = require('node-dht-sensor');
} else {
  var sensorLib = require('./fake-dht-sensor');
}

var Dht = function () {
  sensorLib.initialize(11, 2);
};

Dht.prototype.getTemperature = function () {
  return sensorLib.read().temperature;
};

Dht.prototype.getHumidity = function () {
  return sensorLib.read().humidity;
};

module.exports = new Dht();