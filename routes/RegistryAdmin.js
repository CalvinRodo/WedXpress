function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
}

function CreateRegistryItemFromRequest(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
}

function CreateInviteFromRequest(req) {
  return {
    name: req.body.name,
    invites: req.body.guests
  };
}

function DefaultRedirect(err, res) {
  if (err) throw err;
  res.redirect('/registryAdmin');
}

function SendResultAsJson(err, result, res) {
  if (err) throw err;
  res.send(200, result);

}

exports.index = function (req, res) {
  CheckIfLoggedIn(req, res);
  var async = require('async'),
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    InviteDB = require('../DataLayer/InviteDB.js'),
    MenuDB = require('../DataLayer/MenuDB.js'),
    regDB = new RegistryDB(),
    invDB = new InviteDB(),
    menuDB = new MenuDB();

  async.parallel([
    function (callback) {
      regDB.GetItems(0, callback);
    },
    function (callback) {
      invDB.GetItems(0, callback)
    },
    function (callback) {
      menuDB.GetItems(0, callback);
    }
  ], function (err, results) {
    if (err) throw(err);
    res.render('registryAdmin', {
      title: 'Registry Administration',
      scrollspy: false,
      inviteList: results[1],
      items: results[0],
      menuItems: results[2]
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

  db.SaveItem(CreateInviteFromRequest(req), function (err, results) {
    DefaultRedirect(err, res)
  });
};

exports.DeleteInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
}

exports.EditInvite = function (req, res) {

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();
  db.UpdateItem(req.params.id, CreateInviteFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });
}

exports.GetInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.GetItem(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
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

  db.SaveItem(CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });
};

exports.DeleteRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js').RegistryDB,
    db = new RegistryDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
}

exports.EditRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();
  db.UpdateItem(req.params.id, CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });

}

exports.GetRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetItem(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
  });

};

//Menu Functions

exports.AddMenuItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.SaveItem({
    name: req.body.name,
    course: req.body.course
  }, function (err, result) {
    DefaultRedirect(err, res);
  })
};

exports.DeleteMenuItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
};