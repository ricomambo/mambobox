var Camera = require('../../lib/camera'),
    FakeCamera = require('../../lib/fake-camera');

var Camshoot = function () {
  if (process.env.NODE_ENV === 'production') {
    try {
      this.cam = new Camera();
    } catch(error) {
      console.log(error);
    }
  }

  if (!this.cam) {
    this.cam = new FakeCamera();
  }
};

Camshoot.prototype.capture = function (callback) {
  this.cam.capture(callback);
};

module.exports = Camshoot;
