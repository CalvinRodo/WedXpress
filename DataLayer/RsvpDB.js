var DB = require('./DB.js'),
  util = require('util'),
  RsvpDB = function () {
  };

util.inherits(RsvpDB, DB);

RsvpDB.prototype.DBName = 'RSVP';

RsvpDB.super_(RsvpDB.prototype.DBName);

RsvpDB.prototype.CountAccepted = function CountAccepted (){
  var db = this.ConnectToDB();
  db.collection(this.DBName)
      .find({})
}


module.exports = RsvpDB;
