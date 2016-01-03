var Moisture = require('../models/moisture'),
  moisture = new Moisture(),
  config = require('../../config/config.js'),
  TelegramBot = require('node-telegram-bot-api'),
  bot = new TelegramBot(config.telegram.token),
  Camshoot = require('../models/camshoot'),
  cam = new Camshoot();

module.exports = function(agenda) {
  agenda.define('alerts', function(job, done) {
    moisture.getData().then(function (data) {
      if (data.moisture < 10) {
        bot.sendMessage(config.telegram.channel, "ALERT! Moisture is low: " + data.moisture + "%").then(console.log);
        cam.capture(function (result) {
          bot.sendPhoto(config.telegram.channel, result).then(console.log);
        });
      }
    });
    done();
  });
};
