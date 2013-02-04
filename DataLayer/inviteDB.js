var db = require('./db.js'),
  util = require('util'),
  InviteDB = function () {
    this.guestDB = 'Guests';
  };

util.inherits(InviteDB, db);

InviteDB.prototype.AddInvite = function (invite, callback) {
  var db = this.ConnectToDb();
  db.collection(this.guestDB)
    .insert(invite, function (err, results) {
      db.close();
      callback(err, results);
    });
};

InviteDB.prototype.GetInviteList = function (skipValue, callback) {
  var db = this.ConnectToDb();
  db.collection(this.guestDB)
    .find({}, {limit: 30, skip: skipValue || 0 })
    .toArray(function (err, result) {
      db.close();
      callback(err, result);
    });
};

InviteDB.prototype.DeleteInvite = function (id, callback) {
  var db = this.ConnectToDb();
  db.collection(this.guestDB)
    .removeById(id, function (err) {
      db.close();
      callback(err);
    });
};

module.exports = InviteDB;

