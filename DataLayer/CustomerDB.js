var db = require('./DB.js').DB,
  util = require('util'),
  CustomerDB = function () {
  };

util.inherits(CustomerDB, db);

CustomerDB.prototype.DBName = 'Transaction';

module.exports.CustomerDB = CustomerDB;

