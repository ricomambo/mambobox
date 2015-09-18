var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mambobox'
    },
    port: 3000,
    db: 'mongodb://localhost/mambobox-development',
    influx: {
        host: 'localhost',
        database: 'mambobox'
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'mambobox'
    },
    port: 3000,
    db: 'mongodb://localhost/mambobox-test',
    influx: {
        host: 'localhost',
        database: 'mambobox'
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'mambobox'
    },
    port: 3000,
    db: 'mongodb://localhost/mambobox-production',
    influx: {
        host: 'localhost',
        database: 'mambobox'
    }
  }
};

module.exports = config[env];
