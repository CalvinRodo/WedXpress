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

exports.GetInviteList = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.GetInviteList(0, function (err, results) {
    if (err) throw(err);
    res.render('includes/admin/inviteList.jade', {
      inviteList: results
    })
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

exports.AddInvite = function (req, res) {
  CheckIfLoggedIn(req, res);
  var db = LoadDB();
  db.AddGuest(req.body.name, req.body.guests, function (err, results) {
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

exports.AddRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var db = LoadDB();
  db.SaveRegistryItem(req.body.name, req.body.description, req.body.price, function (err, result) {
    if (err) throw err;
    console.log(result);
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