var camera = process.env.NODE_ENV === 'production' ?
    require('v4l2camera') :
    require('../../lib/fake-camera');

var Camera = function () {
  this.cam = new camera.Camera("/dev/video0");
};

Camera.prototype.capture = function (path) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.cam.start();
    self.cam.capture(function (success) {
      var frame = self.cam.frameRaw();
      require("fs").createWriteStream(path).end(Buffer(frame));
      self.cam.stop();
      resolve();
    });
  });
};

module.exports = Camera;
