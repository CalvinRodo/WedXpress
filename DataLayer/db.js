var DB = function DB() {
}

DB.prototype = {
  ConnectToDB: function () {
    var mongoDb = require('mongoskin'),
      settings = require('../express_settings.js');
    return mongoDb.db(settings.Config.MongoDbConnection);
  },
  GetItems: function (skipValue, callback) {
    var db = this.ConnectToDB();
    db.collection(this.DBName)
      .find({}, { limit: 30, skip: skipValue || 0 })
      .toArray(function (err, result) {
        db.close();
        callback(err, result);
      });
  },
  SaveItem: function (item, callback) {
    var db = this.ConnectToDB();
    db.collection(this.DBName)
      .insert(item, function (err, result) {
        db.close();
        callback(err, result);
      });
  },
  DeleteItem: function (id, callback) {
    var db = this.ConnectToDB();
    db.collection(this.DBName)
      .removeById(id, function (err) {
        db.close();
        callback(err);
      });
  },
  UpdateItem: function (id, item, callback) {
    var db = this.ConnectToDB();
    db.collection(this.DBName)
      .updateById(id, item, function (err, result) {
        db.close();
        callback(err, result);
      });
  }
}

module.exports = DB;