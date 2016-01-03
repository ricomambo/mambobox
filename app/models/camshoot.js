var Camera = process.env.NODE_ENV === 'production' ?
    require('../../lib/camera') :
    require('../../lib/fake-camera');

var Camshoot = function () {
  this.cam = new Camera();
};

Camshoot.prototype.capture = function (callback) {
  this.cam.capture(callback);
};

module.exports = Camshoot;
