module.exports = function (app) {
  var index = require('./routes/index.js'),
    registry = require('./routes/registry.js'),
    charge = require('./routes/charge.js'),
    login = require('./routes/login.js'),
    registryAdmin = require('./routes/registryAdmin.js');


  app.get('/', index.index);


  app.get('/partials/:name', function (req, res) {
    var name = req.param.name;
    res.render('/partials/' + name);
  });

  app.get('/registry', registry.index);
  app.post('/charge', charge.pay);

  app.get('/login', login.index);
  app.post('/login', login.login);

  app.get('/registryAdmin', registryAdmin.index);

  app.get('/regList', registryAdmin.GetRegistryList);
  app.post('/registry', registryAdmin.AddRegistryItem);
  app.get('/registry/delete/:id', registryAdmin.DeleteRegistryItem);
  app.get('/registry/edit/:id', registryAdmin.EditRegistryItem);

  app.get('/guestList', registryAdmin.GetGuestList);


  app.post('/invite', registryAdmin.AddInvite);
  app.get('/inviteList', registryAdmin.GetInviteList);
  app.get('/invite/delete/:id', registryAdmin.DeleteInvite);
  app.get('/invite/edit/:id', registryAdmin.EditInvite);
}