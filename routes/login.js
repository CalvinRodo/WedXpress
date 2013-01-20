/**
 * Login Page.
 * User: calvin
 * Date: 14/01/13
 * Time: 10:06 PM
 * To change this template use File | Settings | File Templates.
 */

exports.index = function (req, res) {
  res.render('login', {title: 'login', scrollspy: false});
};

exports.login = function (req, res) {
  var uname = req.body.username,
    pword = req.body.password,
    settings = require('../express_settings.js');

  if (uname === settings.Config.AdminUsername &&
    pword === settings.Config.AdminPassword) {
    req.session.loggedIn = true;
    res.redirect('../registryAdmin');
    return;
  }
  res.redirect('../');
};