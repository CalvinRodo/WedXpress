function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
}

exports.index = function (req, res) {
  CheckIfLoggedIn(req, res);
  var async = require('async'),
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    InviteDB = require('../DataLayer/InviteDB.js'),
    regDB = new RegistryDB(),
    invDB = new InviteDB();

  async.parallel([
    function (callback) {
      regDB.GetItems(0, callback);
    },
    function (callback) {
      invDB.GetItems(0, callback)
    }
  ], function (err, results) {
    if (err) throw(err);
    res.render('registryAdmin', {
      title: 'Registry Administration',
      scrollspy: false,
      inviteList: results[1],
      items: results[0]
    });
  });
};

//Invite Functions
exports.GetGuestList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js').InviteDB,
    db = new InviteDB();

  db.GetItems(function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/guestList.jade');
  });

};

exports.GetInviteList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var Invite = require('../DataLayer/InviteDB.js'),
    db = new Invite();

  db.GetItems(0, function (err, results) {
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
  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.SaveItem({
    name: req,
    invites: req.body.guests
  }, function (err, results) {
    if (err) throw(err);
    res.redirect('/registryAdmin');
  });
};

exports.DeleteInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.DeleteItem(req.params.id, function (err, results) {
    if (err) throw err;
    res.redirect('/registryAdmin');
  });
}

exports.EditInvite = function (req, res) {

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();
}

exports.GetInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.GetItem(req.params.id, function (err, result) {
    if (err) throw err;

    res.send(200, result);
  });
}

//Registry Functions
exports.GetRegistryList = function (req, res) {
  CheckIfLoggedIn(req, req);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetItems(0, function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/registryAdminList', {
      items: results
    });
  });
};

exports.AddRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.SaveItem({
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

  db.DeleteItem(req.params.id, function (err, result) {
    if (err) throw err;
    res.redirect('/registryAdmin');
  });
}

exports.EditRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();


}

exports.GetRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetItem(req.params.id, function (err, result) {
    if (err) throw err;

    res.send(200, result);

  });

};