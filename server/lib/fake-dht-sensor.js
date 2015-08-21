var FakeDhtSensor = function () {

};

FakeDhtSensor.prototype.initialize = function (type, pin) {
  return true;
};

FakeDhtSensor.prototype.read = function (type, pin) {
  return {
    temperature: Math.floor(Math.random() * 25) + 10,
    humidity: Math.floor(Math.random() * 35) + 35
  };
};

module.exports = new FakeDhtSensor();