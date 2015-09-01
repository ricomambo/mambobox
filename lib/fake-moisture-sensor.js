var FakeMoistureSensor = function () {

};

FakeMoistureSensor.prototype.initialize = function () {
  this.busy = false;
};

FakeMoistureSensor.prototype.readADCSingleEnded = function (channel, pga, sps, callback) {
  callback(null, Math.floor(Math.random() * 4000));
};

module.exports = FakeMoistureSensor;
