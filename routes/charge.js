exports.pay = function (req, res) {
  var mongo = require('../DataLayer/DataLayer.js');
  var dl = mongo.constructor();
  dl.InsertToken(req.body.stripeToken);
};
