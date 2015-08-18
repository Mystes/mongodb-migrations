(function() {
  var DEFAULT_POOL_SIZE, MongoClient, _, buildMongoConnString;

  _ = require('lodash');

  MongoClient = require('mongodb').MongoClient;

  DEFAULT_POOL_SIZE = 5;

  buildMongoConnString = function(config) {
    var hasUser, s;
    s = "mongodb://";
    if (config.user) {
      hasUser = true;
      s += config.user;
    }
    if (config.password) {
      if (!hasUser) {
        throw new Error('Password provided but Username is not');
      }
      s += ':' + config.password;
    }
    if (hasUser) {
      s += '@';
    }
    s += config.host;
    if (config.port) {
      s += ':' + config.port;
    }
    s += '/';
    if (config.db) {
      s += config.db;
    }
    return s;
  };

  exports.connect = function(config, cb) {
    var connectionOptions, poolSize, ref, ref1, ref2, url;
    poolSize = (ref = config.poolSize) != null ? ref : DEFAULT_POOL_SIZE;
    url = (ref1 = config.url) != null ? ref1 : buildMongoConnString(config);
    connectionOptions = {
      server: {
        poolSize: poolSize
      }
    };
    connectionOptions.mongos = (ref2 = config.mongos) != null ? ref2 : {};
    return MongoClient.connect(url, connectionOptions, cb);
  };

}).call(this);
