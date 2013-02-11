var DB = require('./DB.js'),
  util = require('util'),
  InviteDB = function () {
  };

util.inherits(InviteDB, DB);

InviteDB.prototype.DBName = 'Guests';

InviteDB.super_(InviteDB.prototype.DBName);

module.exports = InviteDB;

