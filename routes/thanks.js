exports.index = function (req, res) {
  var id = req.params.id,
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    registryDB = new RegistryDB();

  registryDB.GetItemByID(id, function (err, result) {
    if (err) {
      console.error(err);
      res.redirect('/oops');
    }

    res.render('thanks', {
      loggedIn: req.session.loggedIn,
      title: 'Thank You!!!',
      item: result
    });


  })


};