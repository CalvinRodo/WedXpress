exports.index = function (req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
  res.render('registryAdmin', {
    title: 'Registry Administration'
  })
}

exports.addItem = function (req, res) {
  var db = require('../DataLayer/DataLayer.js').constructor();
  db.SaveRegistryItem(req.body.name, req.body.description, req.body.price);
  res.render('registryAdmin', { title: "RegistryAdmin"});
}