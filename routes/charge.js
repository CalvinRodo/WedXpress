exports.pay = function(req, res){
  var mongo = require('../DataLayer/persist.js');
  var dl = mongo.constructor();
  dl.InsertToken(req.body.stripeToken);
};
