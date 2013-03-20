/**
 * Created with IntelliJ IDEA.
 * User: calvin
 * Date: 1/13/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */

exports.index = function (req, res) {
  var settings = require('../express_settings'),
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetUnboughtItems(function (err, results) {
    if (err) throw(err); //TODO: Handle errors
    res.render("registry", {
      publicKey: settings.Config.StripePublicKey,
      title: "Wedding Registry",
      items: results,
      scrollspy: false
    });
  });
};
