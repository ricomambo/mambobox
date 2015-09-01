var sensor = process.env.NODE_ENV === 'production' ?
    require('node-ads1x15') :
    require('./fake-moisture-sensor'),
  channel = 0,
  sps = '3300',
  pga = '4096';

var Moisture = function () {
  this.adc = new sensor();
};

Moisture.prototype.getData = function (callback) {
  var self = this;

  function readData() {
    if(!self.adc.busy) {
      self.adc.readADCSingleEnded(channel, pga, sps, function(err, data) {
        if(err) { throw err; }
        if(data) {
          cancel();
          callback({moisture: data});
        }
      });
    }
  }

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

module.exports = new Moisture();
