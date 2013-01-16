exports.mongo = function (spec, my){
  var that = {},
    mongoDb = require('mongoskin'),
    settings = require('../express_settings.js'),
    db = mongoDb.db(settings.Config.MongoDbConnection);

  my = my || {};

/*  var InsertRegItem = function(name, description, price){
    db.collection('RegistryItems')
      .Insert({
        name: name,
        description: description,
        price: price
      });
  };
  that.InsertRegItem = InsertRegItem;*/

  var SaveTransaction = function(token){
    db.collection('Transactions')
      .Insert({
        token: token
      });
  };
  that.SaveTransaction = SaveTransaction;

  return that;
};
