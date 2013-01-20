exports.index = function (req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
  var db = require('../DataLayer/DataLayer.js').constructor();
  db.GetRegistryItems(0, function (err, results) {
    if (err) throw(err);
    res.render('registryAdmin', {
      title: 'Registry Administration',
      items: results,
      scrollspy: false
    });
  });
};

exports.addItem = function (req, res) {
  var db = require('../DataLayer/DataLayer.js').constructor();
  db.SaveRegistryItem(req.body.name, req.body.description, req.body.price, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.redirect('/registryAdmin');
  });
};