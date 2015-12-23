var camera = process.env.NODE_ENV === 'production' ?
    require('v4l2camera') :
    require('../../lib/fake-camera'),
    fs = require("fs"),
    pngjs = require("pngjs");

var Camera = function () {
  this.cam = new camera.Camera("/dev/video0");
};

Camera.prototype.capture = function (callback) {
  this.cam.configSet({width: 640, height: 480});
  this.cam.start();
  var self = this;
  times(6, this.cam.capture.bind(this.cam), function () {
    var png = generatePng(self.cam.toRGB(), self.cam.width, self.cam.height);
    self.cam.stop();
    callback(png.pack());
  });
};

var times = function (n, async, cont) {
  return async(function rec(r) {return --n === 0 ? cont(r) : async(rec);});
};

var generatePng = function (rgb, width, height) {
  var png = new pngjs.PNG({
    width: width, height: height, deflateLevel: 1, deflateStrategy: 1,
  });
  var size = width * height;
  for (var i = 0; i < size; i++) {
    png.data[i * 4 + 0] = rgb[i * 3 + 0];
    png.data[i * 4 + 1] = rgb[i * 3 + 1];
    png.data[i * 4 + 2] = rgb[i * 3 + 2];
    png.data[i * 4 + 3] = 255;
  }
  return png;
};

module.exports = Camera;
