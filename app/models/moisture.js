var sensor = process.env.NODE_ENV === 'production' ?
    require('node-ads1x15') :
    require('../../lib/fake-moisture-sensor'),
  jStat = require('jstat').jStat,
  channel = 0,
  sps = '3300',
  pga = '4096',
  Logger = require('../../lib/logger');

var Moisture = function () {
  this.adc = new sensor();
  this.logger = new Logger();
};

Moisture.prototype.getData = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    function readData() {
      if(self.adc.busy) {
        reject(new Error('Moisture sensor not available.'));
      }
      self.adc.readADCSingleEnded(channel, pga, sps, function(err, data) {
        if(err) {
          reject(err);
        }
        if(data !== 0) {
          cancel();
          resolve({moisture: calculateValue(data)});
        }
      });
    }

    function cancel() {
      clearInterval(retry);
      clearTimeout(timeout);
    }

    var retry = setInterval(readData, 500);
    var timeout = setTimeout(function () {
      cancel();
      reject(new Error('Error reading moisture data.'));
    }, 5000);
  });
};

Moisture.prototype.getMedian = function (samples) {
  samples = samples || 10;
  var values = [],
    self = this;

  return new Promise(function (resolve, reject) {
    function readData() {
      if(self.adc.busy) {
        reject(new Error('Moisture sensor not available.'));
      }
      self.adc.readADCSingleEnded(channel, pga, sps, function(err, data) {
        if(err) {
          reject(err);
        }
        if(data !== 0) {
          if (samples-- > 0) {
            values.push(calculateValue(data));
          } else {
            clearInterval(retry);
            resolve({
              moisture: jStat.median(values)
            });
          }
        } else {
          samples--;
        }
      });
    }

    var retry = setInterval(readData, 2100);
  });
};

function calculateValue(data) {
  return Math.round((1 - (1 / (pga/data))) * 100);
}

module.exports = Moisture;
