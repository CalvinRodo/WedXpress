var db = require('./db.js'),
  util = require('util'),
  RegistryDB = function () {
  };

util.inherits(RegistryDB, db);

RegistryDB.prototype.registryDB = 'RegistryItems';
RegistryDB.prototype.GetRegistryItems = function (skipValue, callback) {
  var db = this.ConnectToDb();
  db.collection(this.registryDB)
    .find({}, { limit: 30, skip: skipValue || 0 })
    .toArray(function (err, result) {
      db.close();
      callback(err, result);
    });
};

RegistryDB.prototype.SaveRegistryItem = function (item, callback) {
  var db = this.ConnectToDb();
  db.collection(this.registryDB)
    .insert(item, function (err, result) {
      db.close();
      callback(err, result);
    });
};

RegistryDB.prototype.DeleteRegistryItem = function (id, callback) {
  var db = this.ConnectToDb();
  db.collection(this.registryDB)
    .removeById(id, function (err) {
      db.close();
      callback(err);
    });
};

module.exports = RegistryDB;