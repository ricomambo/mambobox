var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    config = require('./' + env + '.json');

config.root = rootPath;
config.app = {
  name: 'mambobox'
};

module.exports = config;
