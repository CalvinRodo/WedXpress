module.exports = function (app) {
  var index = require('./routes/index.js'),
    registry = require('./routes/registry.js'),
    charge = require('./routes/charge.js'),
    login = require('./routes/login.js'),
    admin = require('./routes/admin.js');

  app.get('/', index.index);
  app.get('/rsvp/:inviteurl', index.rsvp)
  app.post('/rsvp/:id', index.saveRsvp)
  app.get('/songList', index.SongList);

  app.post('/charge', charge.pay);

  app.get('/registry', registry.index);

  app.get('/login', login.index);
  app.post('/login', login.login);

  app.get('/registryAdmin', admin.index);
  app.get('/registry/delete/:id', admin.DeleteRegistryItem);
  app.get('/registry/edit/:id', admin.GetRegistryItem);
  app.get('/invite/delete/:id', admin.DeleteInvite);
  app.get('/invite/edit/:id', admin.GetInvite);
  app.get('/menuItem/delete/:id', admin.DeleteMenuItem);
  app.get('/upload/:id', admin.Upload);

  app.post('/registry/edit/:id', admin.EditRegistryItem);
  app.post('/invite', admin.AddInvite);
  app.post('/invite/edit/:id', admin.EditInvite);
  app.post('/menuItem', admin.AddMenuItem);
  app.post('/registry', admin.AddRegistryItem);
}