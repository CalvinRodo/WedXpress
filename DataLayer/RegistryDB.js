var db = require('./DB.js'),
  util = require('util'),
  RegistryDB = function () {
  };

util.inherits(RegistryDB, db);

RegistryDB.prototype.DBName = 'RegistryItems';

RegistryDB.super_(RegistryDB.prototype.DBName);

RegistryDB.prototype.GetUnboughtItems = function GetUnboughtItems(callback) {
  this.Find({'purchased': {$ne: true} }, callback);
};

RegistryDB.prototype.GetBoughtItems = function GetBoughtItems(callback) {
  this.Find({'purchased': true}, callback);
};

module.exports = RegistryDB;