var Gpio = process.env.NODE_ENV === 'production' ?
    require('onoff').Gpio :
    require('./fake-gpio');

var Switch = function (pin, reverse) {
  this.reverse = reverse || false;
  this.gpio = new Gpio(pin, 'out');
};

Switch.prototype.on = function () {
  this.gpio.writeSync(this.reverse ? 0 : 1);
  return this.status();
}

Switch.prototype.off = function () {
  this.gpio.writeSync(this.reverse ? 1 : 0);
  return this.status();
}

Switch.prototype.status = function () {
  return this.reverse ? !this.gpio.readSync() : this.gpio.readSync() == true;
}

Switch.prototype.close = function () {
  return this.gpio.unexport();
}

module.exports = Switch;
