var fs = require('fs');

var FakeGpio = function (pin, direction) {
  this.file = '/tmp/fake-gpio_' + pin;
  this.writeSync(direction === 'high' ? 1 : 0);
};

FakeGpio.prototype.writeSync = function (value) {
  fs.writeFileSync(this.file, value.toString());
};

FakeGpio.prototype.readSync = function () {
  return parseInt(fs.readFileSync(this.file));
};

FakeGpio.prototype.unexport = function () {
};

module.exports = FakeGpio;
