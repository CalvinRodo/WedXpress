module.exports = function (app) {
  var index = require('./routes/index.js'),
    registry = require('./routes/registry.js'),
    charge = require('./routes/charge.js'),
    login = require('./routes/login.js'),
    admin = require('./routes/admin.js'),
    oops = require('./routes/oops.js');

  app.get('/', index.index);
  app.get('/rsvp/:inviteurl', index.rsvp);
  app.post('/rsvp/:id', index.saveRsvp);
  app.get('/admin/rsvp/view/:id', admin.ViewRSVP);

  app.post('/charge/:id', charge.pay);

  app.get('/login', login.index);
  app.post('/login', login.login);
  app.get('/logout', login.logout);

  app.get('/registry', registry.index);
  app.get('/registry/delete/:id', admin.DeleteRegistryItem);
  app.get('/registry/edit/:id', admin.GetRegistryItem);
  app.post('/registry/edit/:id', admin.EditRegistryItem);
  app.post('/registry', admin.AddRegistryItem);

  app.get('/admin', admin.index);
  app.get('/menuItem/delete/:id', admin.DeleteMenuItem);
  app.get('/upload', admin.Upload);
  app.post('/upload', admin.SaveUploadInfo);

  app.post('/menuItem', admin.AddMenuItem);

  app.get('/invite/delete/:id', admin.DeleteInvite);
  app.get('/invite/edit/:id', admin.GetInvite);
  app.post('/invite', admin.AddInvite);
  app.post('/invite/edit/:id', admin.EditInvite);

  app.get('/oops', oops.index);
}