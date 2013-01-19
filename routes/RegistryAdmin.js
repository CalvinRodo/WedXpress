exports.index = function (req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
  var db = require('../DataLayer/DataLayer.js').constructor();
  var items = db.GetRegistryItems();
  res.render('registryAdmin', {
    title: 'Registry Administration',
    items: items
  })
}

exports.addItem = function (req, res) {
  var db = require('../DataLayer/DataLayer.js').constructor();
  db.SaveRegistryItem(req.body.name, req.body.description, req.body.price);
  res.render('registryAdmin', { title: "RegistryAdmin"});
}