var DB = require('./DB.js'),
  util = require('util'),
  ImageDB = function () {
  };

util.inherits(ImageDB, DB);

ImageDB.prototype.DBName = 'Image';

ImageDB.super_(ImageDB.prototype.DBName);

module.exports = ImageDB;
