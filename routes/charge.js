exports.pay = function (req, res) {
  var id = req.params,
    token = req.body.stripeToken,
    stripe = require('../DataLayer/StripeCharger.js').constructor({}, {}),
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    registryDB = new RegistryDB(),
    async = require('async');

  async.waterfall([function (callback) {
    registryDB.GetItemByID(id, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  }, function (regItem, callback) {
    stripe.ChargeCustomer(token, regItem.price, regItem.name, function (err, result) {
      if (err) throw err;
      callback(null, result, regItem);
    });
  }, function (customer, regItem) {
    registryDB.UpdateByID(regItem.ID, {'purchased': true }, function (err, result) {
      if (err) throw err;
      res.redirect('./thanks/' + regItem.ID);
    });
  }]);
};
