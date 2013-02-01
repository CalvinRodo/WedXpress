function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
}

exports.index = function (req, res) {
  CheckIfLoggedIn(req, res);

  res.render('registryAdmin', {
    title: 'Registry Administration',
    scrollspy: false
  });
};

//Invite Functions
exports.GetGuestList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js').InviteDB,
    db = new InviteDB();

  db.GetGuestList(function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/guestList.jade');
  });

};

exports.GetInviteList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var Invite = require('../DataLayer/InviteDB.js').InviteDB,
    db = new Invite();

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
  var InviteDB = require('../DataLayer/InviteDB.js').InviteDB,
    db = new InviteDB();

  db.AddInvite({
    name: req,
    invites: req.body.guests
  }, function (err, results) {
    if (err) throw(err);
    res.redirect('/registryAdmin');
  });
};

exports.DeleteInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js').InviteDB,
    db = new InviteDB();

  db.DeleteInvite(req.params.id, function (err, results) {
    if (err) throw err;
    res.redirect('/registryAdmin');
  });
}

exports.EditInvite = function (req, res) {

  var InviteDB = require('../DataLayer/InviteDB.js').InviteDB,
    db = new InviteDB();
}

//Registry Functions
exports.GetRegistryList = function (req, res) {
  CheckIfLoggedIn(req, req);

  var RegistryDB = require('../DataLayer/RegistryDB.js').RegistryDB,
    db = new RegistryDB();

  db.GetRegistryItems(0, function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/registryAdminList', {
      items: results
    });
  });
};

exports.AddRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js').RegistryDB,
    db = new RegistryDB();

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

  var RegistryDB = require('../DataLayer/RegistryDB.js').RegistryDB,
    db = new RegistryDB();
  db.DeleteRegistryItem(req.params.id, function (err, result) {
    if (err) throw err;
    res.redirect('/registryAdmin');
  });
}

exports.EditRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js').RegistryDB,
    db = new RegistryDB();
}