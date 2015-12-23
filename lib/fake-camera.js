var FakeCamera = function (device) {

};

FakeCamera.prototype.start = function () {
};

FakeCamera.prototype.capture = function (callback) {
  callback();
};

FakeCamera.prototype.frameRaw = function () {
  return require("fs").readFileSync(__dirname + '/box.jpg');
  // return new Buffer(1000);
};

FakeCamera.prototype.stop = function () {
};

module.exports.Camera = FakeCamera;
