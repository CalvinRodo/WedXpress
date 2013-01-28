function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
}

function LoadDB() {
  return require('../DataLayer/DataLayer.js').constructor();
}

exports.index = function (req, res) {
  CheckIfLoggedIn(req, res);

  res.render('registryAdmin', {
    title: 'Registry Administration',
    scrollspy: false
  });
};

exports.GetGuestList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.GetGuestList(function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/guestList.jade');
  });

};

//Invite Functions
exports.GetInviteList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();

  db.GetInviteList(0, function (err, results) {
    if (err) throw(err);

    var settings = require('../express_settings.js'),
      HashID = require('hashids'),
      hashID = new HashID(settings.Config.HashIDSalt);

    results.map(function (obj) {
      obj.hashId = hashID.encrypt(obj._id);
    });

    res.render('includes/admin/inviteList', {
      inviteList: results
    });

  });

};

exports.AddInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.AddGuest({
    name: req,
    invites: req.body.guests
  }, function (err, results) {
    if (err) throw(err);
    res.redirect('/registryAdmin');
  });
};

exports.DeleteInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.DeleteInvite(req.params.id, function (err, results) {
    if (err) throw err;
    res.redirect('/registryAdmin');
  });
}

exports.EditInvite = function (req, res) {

}

//Registry Functions
exports.GetRegistryList = function (req, res) {
  CheckIfLoggedIn(req, req);
  var db = LoadDB();
  db.GetRegistryItems(0, function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/registryAdminList', {
      items: results
    });
  });
};

exports.AddRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.SaveRegistryItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }, function (err, result) {

    if (err) throw err;

    res.redirect('/registryAdmin');

  });
};

exports.DeleteRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.DeleteRegistryItem(req.params.id, function (err, result) {
    if (err) throw err;
    res.redirect('/registryAdmin');
  });
}

exports.EditRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

}