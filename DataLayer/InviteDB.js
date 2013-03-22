var DB = require('./DB.js'),
  util = require('util'),
  InviteDB = function () {
  };

util.inherits(InviteDB, DB);

InviteDB.prototype.DBName = 'Guests';

InviteDB.super_(InviteDB.prototype.DBName);

InviteDB.prototype.getInviteByUrl = function getInviteByUrl(urlName, callback) {
  this.FindOne({url: urlName }, callback);
};

InviteDB.prototype.getAllUnusedRSVPs = function getAllUnusedRSVPs(callback) {
  this.Find({'rsvpStatus': {$ne: true}}, callback);
};

InviteDB.prototype.updateRSVPStatus = function updateRSVPStatus(id, status, callback) {
  this.UpdateByID(id, {rsvpStatus: status}, callback);
}

module.exports = InviteDB;

