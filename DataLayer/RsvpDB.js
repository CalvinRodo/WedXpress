var DB = require('./DB.js'),
  util = require('util'),
  RsvpDB = function () {
  };

util.inherits(RsvpDB, DB);

RsvpDB.prototype.DBName = 'RSVP';

RsvpDB.super_(RsvpDB.prototype.DBName);

module.exports = RsvpDB;
