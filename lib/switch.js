var Gpio = process.env.NODE_ENV === 'production' ?
    require('onoff').Gpio :
    require('./fake-gpio');

var Switch = function (pin, reverse) {
  this.pin = pin;
  this.reverse = reverse || false;
};

Switch.prototype.open = function () {
  this.gpio = new Gpio(this.pin, 'out');
}

Switch.prototype.on = function () {
  if (!this.gpio) { this.open() }
  this.gpio.writeSync(this.reverse ? 0 : 1);
  return this.status();
}

Switch.prototype.off = function () {
  if (!this.gpio) { this.open() }
  this.gpio.writeSync(this.reverse ? 1 : 0);
  return this.status();
}

Switch.prototype.status = function () {
  if (!this.gpio) { this.open() }
  return this.reverse ? !this.gpio.readSync() : this.gpio.readSync() == true;
}

Switch.prototype.close = function () {
  return this.gpio.unexport();
}

module.exports = Switch;
