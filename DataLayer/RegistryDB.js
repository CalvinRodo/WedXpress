var db = require('./DB.js'),
  util = require('util'),
  RegistryDB = function () {
  };

util.inherits(RegistryDB, db);

RegistryDB.prototype.DBName = 'RegistryItems';

RegistryDB.super_(RegistryDB.prototype.DBName);

module.exports = RegistryDB;