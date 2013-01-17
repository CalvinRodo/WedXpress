/**
 * Created with IntelliJ IDEA.
 * User: calvin
 * Date: 1/16/13
 * Time: 8:18 PM
 * To change this template use File | Settings | File Templates.
 */
exports.constructor = function (spec, my) {
  var that = {},
    my = my || {};

  function HandleChargeError(err) {
    console.log(err);
  }

  my.HandleChargeError = HandleChargeError;

  my.HandleSuccessfullCharge = function (customer) {
    console.log(customer);
  };
  that.ChargeCustomer = function (token, price, itemName) {
    var settings = require('../express_settings'),
      stripe = require('stripe')(settings.Config.StripePrivateKey);

    stripe.charges.create({
      card: token,
      amount: price,
      currency: "cad",
      description: itemName
    }, function (err, customer) {
      if (err) {
        my.HandleChargeError(err);
      } else {
        my.HandleSuccessfullCharge(customer);
      }
    });
  };

  return that;
};