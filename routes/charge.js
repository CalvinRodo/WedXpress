exports.pay = function (req, res) {
  var stripe = require('../DataLayer/StripeCharger.js').constructor({}, {});
  stripe.ChargeCustomer(req.body.stripeToken, "10000", "test charge");
};
