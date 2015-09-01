var sensor = process.env.NODE_ENV === 'production' ?
    require('node-dht-sensor') :
    require('./fake-dht-sensor');


var Dht = function () {
  if (!sensor.initialize(11, 17)) {
    return null;
  }
};

Dht.prototype.getData = function (callback) {
  function readData() {
    var data = sensor.read();
    if (data.temperature != 0 && data.humidity != 0) {
      cancel();
      callback(data);
    }
  };

  function cancel() {
    clearInterval(retry);
    clearTimeout(timeout);
  };

  retry = setInterval(readData, 500);
  timeout = setTimeout(function () {
    cancel();
    callback(null);
  }, 5000);
};

module.exports = new Dht();
