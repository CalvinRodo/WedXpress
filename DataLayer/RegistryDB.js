var db = require('./db.js').DB,
  util = require('util'),
  RegistryDB = function () {
    this.registryDB = 'RegistryItems';
  };

util.inherits(RegistryDB, db);


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
