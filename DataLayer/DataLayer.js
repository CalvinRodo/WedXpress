exports.constructor = function (spec, my) {
  var that = {};
  my = my || {};

  my.ConnectToDb = function () {
    var mongoDb = require('mongoskin'),
      settings = require('../express_settings.js');
    return mongoDb.db(settings.Config.MongoDbConnection);
  };

  that.GetRegistryItems = function () {
    var db = my.ConnectToDb();
    db.collection('RegistryItems');
    //TODO: Finish getting registry items
    db.close();
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
    db.close();
  }
  s;

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
