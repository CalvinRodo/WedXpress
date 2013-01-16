/**
 * Created with IntelliJ IDEA.
 * User: calvin
 * Date: 1/13/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */

exports.index = function (req, res) {
  var settings = require('../express_settings');
  res.render("registry", {
    publicKey: settings.Config.StripePublicKey,
    title: "Wedding Registry",
    items: [
      {
        name: "Flight to Malta",
        text: "Help us pay for a flight to Malta",
        price: "100"
      },
      {
        name: "Flight to Malta",
        text: "Help us pay for a flight to Malta",
        price: "100"
      },
      {
        name: "Flight to Malta",
        text: "Help us pay for a flight to Malta",
        price: "100"
      },
      {
        name: "Flight to Malta",
        text: "Help us pay for a flight to Malta",
        price: "100"
      },
      {
        name: "Flight to Malta",
        text: "Help us pay for a flight to Malta",
        price: "100"
      },
      {
        name: "Flight to Malta",
        text: "Help us pay for a flight to Malta",
        price: "100"
      }
    ]
  });
};
