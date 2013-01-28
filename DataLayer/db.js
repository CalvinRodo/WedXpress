function DB() {

}

db.prototype.ConnectToDb = function ConnectToDb() {
  var mongoDb = require('mongoskin'),
    settings = require('../express_settings.js');
  return mongoDb.db(settings.Config.MongoDbConnection);
};

exports.DB = DB;