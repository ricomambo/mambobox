var sensor = process.env.NODE_ENV === 'production' ?
    require('node-ads1x15') :
    require('./fake-moisture-sensor'),
  jStat = require('jStat').jStat,
  channel = 0,
  sps = '3300',
  pga = '4096';

var Moisture = function () {
  this.adc = new sensor();
};

Moisture.prototype.getData = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    function readData() {
      if(self.adc.busy) { reject(new Error('Sensor not available')); }
      self.adc.readADCSingleEnded(channel, pga, sps, function(err, data) {
        if(err) { reject(err); }
        if(!data) { reject(new Error('Error reading data')); }
        cancel();
        resolve({moisture: data});
      });
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

Moisture.prototype.getMedian = function (samples) {
  samples = samples || 10;
  var values = [],
    self = this;

  return new Promise(function (resolve, reject) {
    function readData() {
      if(self.adc.busy) { reject(new Error('Sensor not available')); }
      self.adc.readADCSingleEnded(channel, pga, sps, function(err, data) {
        if(err) { reject(err); }
        if(!data) { reject(new Error('Error reading data')); }
        if (samples-- > 0) {
          values.push(data);
        } else {
          clearInterval(retry);
          resolve({moisture: jStat.median(values)});
        }
      });
    }

    var retry = setInterval(readData, 2100);
  });
};

module.exports = new Moisture();
