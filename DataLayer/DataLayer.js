exports.constructor = function (spec, my) {
  var that = {};
  my = my || {};

  my.registryDB = 'RegistryItems';
  my.transactionDB = 'Transactions';

  my.ConnectToDb = function () {
    var mongoDb = require('mongoskin'),
      settings = require('../express_settings.js');
    return mongoDb.db(settings.Config.MongoDbConnection);
  };

  that.GetRegistryItems = function (skipValue, callback) {
    var db = my.ConnectToDb();
    var items = {};
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
      .insert()
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
