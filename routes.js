module.exports = function (app) {
  var index = require('./routes/index.js'),
    registry = require('./routes/registry.js'),
    charge = require('./routes/charge.js'),
    login = require('./routes/login.js'),
    registryAdmin = require('./routes/registryAdmin.js');


  app.get('/', index.index);
  app.get('/:inviteurl', index.rsvp)
  app.get('/songList', index.SongList);

  app.get('/registry', registry.index);
  app.post('/charge', charge.pay);

  app.get('/login', login.index);
  app.post('/login', login.login);

  app.get('/registryAdmin', registryAdmin.index);

  app.get('/regList', registryAdmin.GetRegistryList);
  app.post('/registry', registryAdmin.AddRegistryItem);

  app.get('/registry/delete/:id', registryAdmin.DeleteRegistryItem);
  app.get('/registry/edit/:id', registryAdmin.GetRegistryItem);
  app.post('/registry/edit/:id', registryAdmin.EditRegistryItem);

  app.get('/guestList', registryAdmin.GetGuestList);

  app.post('/invite', registryAdmin.AddInvite);
  app.get('/inviteList', registryAdmin.GetInviteList);
  app.get('/invite/delete/:id', registryAdmin.DeleteInvite);
  app.post('/invite/edit/:id', registryAdmin.EditInvite);
  app.get('/invite/edit/:id', registryAdmin.GetInvite);

  app.post('/menuItem', registryAdmin.AddMenuItem);
  app.get('/menuItem/delete/:id', registryAdmin.DeleteMenuItem);

  app.get('/upload/:id', registryAdmin.Upload);
}