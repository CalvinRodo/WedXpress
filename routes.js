exports.SetRoute = function SetRoute (app) {
  var index = require('./routes/index.js'),
    registry = require('./routes/registry.js'),
    charge = require('./routes/charge.js'),
    login = require('./routes/login.js'),
    admin = require('./routes/admin.js'),
    menuadmin = require('./routes/menuadmin.js'),
    rsvpadmin = require('./routes/rsvpadmin.js'),
    registryadmin = require('./routes/registryadmin.js'),
    oops = require('./routes/oops.js'),
    thanks = require('./routes/thanks.js');

  app.get('/', index.index);
  app.get('/rsvp/:inviteurl', index.rsvp);
  app.post('/rsvp/:id', index.saveRsvp);

  app.post('/charge/:id', charge.pay);

  app.get('/login', login.index);
  app.post('/login', login.login);
  app.get('/logout', login.logout);

  app.get('/registry', registry.index);

  app.get('/oops', oops.index);

  app.get('/thanks/:id', thanks.index);

  //Administrative routes
  app.get('/admin', admin.index);

  app.get('/registryadmin', registryadmin.index);
  app.get('/registryadmin/delete/:id', registryadmin.DeleteRegistryItem);
  app.get('/registryadmin/edit/:id', registryadmin.GetRegistryItem);
  app.post('/registryadmin/edit/:id', registryadmin.EditRegistryItem);
  app.post('/registryadmin', registryadmin.AddRegistryItem);
  app.get('/registryadmin/copy/:id', registryadmin.CopyRegistryItem);
  app.get('/upload', registryadmin.Upload);
  app.post('/upload', registryadmin.SaveUploadInfo);
  app.get('/image/:id', registryadmin.GetImageList);

  app.get('/menuadmin', menuadmin.index);
  app.post('/menuItem', menuadmin.AddMenuItem);
  app.get('/menuItem/delete/:id', menuadmin.DeleteMenuItem);

  app.get('/invite', rsvpadmin.index);
  app.get('/invite/delete/:id', rsvpadmin.DeleteInvite);
  app.get('/invite/edit/:id', rsvpadmin.GetInvite);
  app.post('/invite', rsvpadmin.AddInvite);
  app.post('/invite/edit/:id', rsvpadmin.EditInvite);
  app.get('/admin/rsvp/view/:id', rsvpadmin.ViewRSVP);

};