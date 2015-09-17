var FakeGpio = function (pin, direction) {
  this.value = 0;
};

FakeGpio.prototype.writeSync = function(value) {
  this.value = value;
};

FakeGpio.prototype.readSync = function() {
  return this.value;
};

FakeGpio.prototype.unexport = function() {
};

module.exports = FakeGpio;
