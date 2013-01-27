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

  that.AddGuest = function (name, invites, callback) {
    var db = my.ConnectToDb();
    db.collection(my.guestDB)
      .insert({
        name: name,
        invites: invites
      }, function (err, results) {
        db.close();
        callback(err, results);
      });
  }

  that.GetInviteList = function (skipValue, callback) {
    var db = my.ConnectToDb();
    db.collection(my.guestDB)
      .find({}, {limit: 30, skip: skipValue || 0 })
      .toArray(function (err, result) {
        db.close();
        callback(err, result);
      })

  }

  that.DeleteInvite = function (id, callback) {
    var db = my.ConnectToDb();
    db.collection(my.guestDB)
      .removeById(id, function (err) {
        db.close();
        callback(err);
      });
  };

  that.GetRegistryItems = function (skipValue, callback) {
    var db = my.ConnectToDb();
    db.collection(my.registryDB)
      .find({}, { limit: 30, skip: skipValue || 0 })
      .toArray(function (err, result) {
        db.close();
        callback(err, result);
      });
  };

  that.SaveRegistryItem = function (name, description, price, callback) {
    var db = my.ConnectToDb();
    db.collection(my.registryDB)
      .insert({
        name: name,
        description: description,
        price: price
      }, function (err, result) {
        db.close();
        callback(err, result);
      });
  };

  that.DeleteRegistryItem = function (id, callback) {
    var db = my.ConnectToDb();
    db.collection(my.registryDB)
      .removeById(id, function (err) {
        db.close();
        callback(err);
      });
  };

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
