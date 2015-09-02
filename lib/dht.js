var sensor = process.env.NODE_ENV === 'production' ?
    require('node-dht-sensor') :
    require('./fake-dht-sensor');


var Dht = function () {
  if (!sensor.initialize(11, 17)) {
    return null;
  }
};

Dht.prototype.getData = function () {
  return new Promise(function (resolve, reject) {
    function readData() {
      var data = sensor.read();
      if (data.temperature !== 0 && data.humidity !== 0) {
        cancel();
        resolve(data);
      }
    }

    function cancel() {
      clearInterval(retry);
      clearTimeout(timeout);
    }

    var retry = setInterval(readData, 500);
    var timeout = setTimeout(function () {
      cancel();
      reject(new Error('Error reading data'));
    }, 5000);
  });
};

module.exports = new Dht();
