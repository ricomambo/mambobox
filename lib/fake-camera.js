var fs = require("fs");

var FakeCamera = function (device) {
};

FakeCamera.prototype.capture = function (callback) {
  callback(fs.createReadStream(__dirname + '/image.png'));
};

module.exports = FakeCamera;
