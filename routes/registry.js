exports.index = function (req, res) {
  var settings = require('../express_settings'),
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetUnboughtItems(function (err, results) {
    if (err) {
      console.error('Error getting registry Items');
      console.error(err);
      res.redirect('/oops');
    }

    res.render("registry", {
      loggedIn: req.session.loggedIn,
      publicKey: settings.Config.StripePublicKey,
      title: "Wedding Registry",
      items: results,
      scrollspy: false
    });
  });
}
