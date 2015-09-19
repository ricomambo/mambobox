var util = require("util"),
  Switch = require('./switch');

var Light = function () {
  Switch.call(this, 14, true);
};
util.inherits(Light, Switch);

module.exports = Light;
