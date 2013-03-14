var DB = require('./DB.js'),
  util = require('util'),
  SongDB = function () {
  };

util.inherits(SongDB, DB);

SongDB.prototype.DBName = 'Songs';

SongDB.super_(SongDB.prototype.DBName);

module.exports = SongDB;
