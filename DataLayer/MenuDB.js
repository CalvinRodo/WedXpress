var DB = require('./DB.js'),
  util = require('util'),
  MenuDB = function () {
  };

util.inherits(MenuDB, DB);

MenuDB.prototype.DBName = 'Menu';

MenuDB.super_(MenuDB.prototype.DBName);

module.exports = MenuDB;
