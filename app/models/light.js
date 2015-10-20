var util = require("util"),
  Switch = require('./switch');

var Light = function () {
  Switch.call(this, 15, true);
};
util.inherits(Light, Switch);

Light.prototype.get = function () {
  return {
    status: this.getStatus(),
  };
};

Light.prototype.save = function (data) {
  if (data.status) {
    this.on();
  } else {
    this.off();
  }
  return this.get();
};

module.exports = Light;
