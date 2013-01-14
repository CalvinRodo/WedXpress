module.exports.MongoDB = function(){
  var settings = require('../express_settings'),
    MongoClient = require('mongoDB').MongoClient;

  MongoClient.connect(settings.Config.MongoDbConnection, function(err, db){
    if(err){ return console.dir(err); }

  });
};