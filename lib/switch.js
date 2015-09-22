//var Gpio = require('onoff').Gpio;
var Gpio = process.env.NODE_ENV === 'production' ?
    require('onoff').Gpio :
    require('./fake-gpio');

var Switch = function (pin, reverse) {
  this.reverse = reverse || false;
  this.gpio = new Gpio(pin, this.reverse ? 'high' : 'low');
};

Switch.prototype.on = function () {
  this.setStatus(this.reverse ? 0 : 1);
  return this.status();
}

Switch.prototype.off = function () {
  this.setStatus(this.reverse ? 1 : 0);
  return this.status();
}

Switch.prototype.setStatus = function (status) {
  this.gpio.writeSync(status);
}

Switch.prototype.status = function () {
  var status = this.reverse ? !this.gpio.readSync() : this.gpio.readSync() == true;
  return status;
}

Switch.prototype.close = function () {
  return this.gpio.unexport();
}

module.exports = Switch;
