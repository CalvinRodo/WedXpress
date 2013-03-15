var DB = require('./DB.js'),
  util = require('util'),
  InviteDB = function () {
  };

util.inherits(InviteDB, DB);

InviteDB.prototype.DBName = 'Guests';

InviteDB.super_(InviteDB.prototype.DBName);


InviteDB.prototype.getInviteByUrl = function getInviteByUrl(urlName, callback) {

  var db = this.ConnectToDB();
  db.collection(this.DBName).findOne({url: urlName }, function (err, result) {
    db.close();
    callback(err, result);
  });
};

InviteDB.prototype.updateRSVPStatus = function updateRSVPStatus(id, status, callback) {
  var db = this.ConnectToDB();
  db.collection(this.DBName).updateById(id, {$set: {rsvpStatus: status}}, function (err, result) {
    db.close();
    callback(err, result);
  });
}
module.exports = InviteDB;

