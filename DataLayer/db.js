var DB = function DB() {
}

DB.prototype = {
  ConnectToDb: function () {
    var mongoDb = require('mongoskin'),
      settings = require('../express_settings.js');
    return mongoDb.db(settings.Config.MongoDbConnection);
  }
}

exports.DB = DB;