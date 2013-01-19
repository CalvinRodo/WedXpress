exports.constructor = function (spec, my) {
  var that = {};
  my = my || {};

  my.ConnectToDb = function () {
    var mongoDb = require('mongoskin'),
      settings = require('../express_settings.js');
    return mongoDb.db(settings.Config.MongoDbConnection);
  };

  that.GetRegistryItems = function (skipValue) {
    var db = my.ConnectToDb();
    var items = {};
    db.collection('RegistryItems')
      .find({}, { limit: 30, skip: skipValue || 0 })
      .toArray(function (err, result) {
        db.close();
        if (err) throw err;
        items = result;
      });
    return items;
  };

  that.SaveRegistryItem = function (name, description, price) {
    var db = my.ConnectToDb();
    db.collection('RegistryItems')
      .insert({
        name: name,
        description: description,
        price: price
      }, function (err, result) {
        db.close();
        if (err) {
          throw err;
        } else {
          console.log('Added');
        }
      });
  };

  that.SaveCustomer = function (customer) {
    var db = my.ConnectToDb();
    db.collection('Transactions')
      .insert({
        customer: customer
      }, function (err, result) {
        db.close();
        if (err) throw err;
        if (result) console.log('Added!');
      });
  };

  return that;
};
