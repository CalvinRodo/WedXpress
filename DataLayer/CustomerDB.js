var DB = require('./DB.js'),
  util = require('util'),
  CustomerDB = function () {
  };

util.inherits(CustomerDB, DB);

CustomerDB.prototype.DBName = 'Transaction';

CustomerDB.super_(CustomerDB.prototype.DBName);

module.exports = CustomerDB;
