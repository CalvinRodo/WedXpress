function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn !== true) {
    res.redirect('/');
  }
}

function DefaultRedirect(err, res) {
  if (err) {
    console.log('failed on error concerning ' + section);
    console.error(err);
    res.redirect('/oops');
    return;
  }
  res.redirect('/menuadmin');
}

function SendResultAsJson(err, result, res) {
  if (err) {
    console.error(err);
    res.send(500, result);
  }
  res.send(200, result);

}

exports.AddMenuItem = function AddMenuItem(req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.SaveItem({
    name: req.body.name,
    course: req.body.course
  }, function (err, result) {
    DefaultRedirect(err, res);
  });
};

exports.index = function index(req, res) {
  CheckIfLoggedIn(req, res);
  var MenuDB = require('../DataLayer/MenuDB.js'),
      menuDB = new MenuDB();

      menuDB.GetItems(0, function RenderPage(err, results) {
        var menus = results;

        if (err) {
          console.error('Failed on rendering admin page');
          console.error(err);
        }

        res.render('menuadmin', {
          loggedIn: true,
          title: 'Registry Administration',
          scrollspy: false,
          menuItems: menus
        });
  });
};

exports.DeleteMenuItem = function DeleteMenuItem(req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
};

