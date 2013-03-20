exports.ChargeCustomer = function ChargeCustomer(token, price, itemName, callback) {
  var settings = require('../express_settings'),
    stripe = require('stripe')(settings.Config.StripePrivateKey);

  stripe.charges.create({
    card: token,
    amount: price,
    currency: "cad",
    description: itemName
  }, function (err, customer) {
    callback(err, customer);
  });
};

