function inviteDB() {
  var DB = require('./db.js');
  var that = Object.create(DB);

  return that;
}

inviteDB.prototype.GetInviteList = function (skipValue, callback) {
  var db = my.ConnectToDb();
  db.collection(my.guestDB)
    .find({}, {limit: 30, skip: skipValue || 0 })
    .toArray(function (err, result) {
      db.close();
      callback(err, result);
    });
}

inviteDB.DeleteInvite = function (id, callback) {
  var db = my.ConnectToDb();
  db.collection(my.guestDB)
    .removeById(id, function (err) {
      db.close();
      callback(err);
    });
}

exports.inviteDB = inviteDB;


function RegistryDB() {

}


RegistryDB.prototype.GetRegistryItems = function (skipValue, callback) {
  var db = my.ConnectToDb();
  db.collection(my.registryDB)
    .find({}, { limit: 30, skip: skipValue || 0 })
    .toArray(function (err, result) {
      db.close();
      callback(err, result);
    });
};

RegistryDB.prototype.SaveRegistryItem = function (item, callback) {
  var db = my.ConnectToDb();
  db.collection(my.registryDB)
    .insert(item, function (err, result) {
      db.close();
      callback(err, result);
    });
};

RegistryDB.prototype.DeleteRegistryItem = function (id, callback) {
  var db = my.ConnectToDb();
  db.collection(my.registryDB)
    .removeById(id, function (err) {
      db.close();
      callback(err);
    });
};
exports.RegistryDB = RegistryDB;

exports.constructor = function (spec, my) {
  var that = {};
  my = my || {};

  my.registryDB = 'RegistryItems';
  my.transactionDB = 'Transactions';
  my.guestDB = 'Guests';

  my.ConnectToDb = function () {
    var mongoDb = require('mongoskin'),
      settings = require('../express_settings.js');
    return mongoDb.db(settings.Config.MongoDbConnection);
  };

  that.AddGuest = function (invite, callback) {
    var db = my.ConnectToDb();
    db.collection(my.guestDB)
      .insert(invite, function (err, results) {
        db.close();
        callback(err, results);
      });
  }

  that.SaveCustomer = function (customer, callback) {
    var db = my.ConnectToDb();
    db.collection()
      .insert({
        customer: customer
      }, function (err, result) {
        db.close();
        callback(err, result);
      });
  };

  return that;
};
