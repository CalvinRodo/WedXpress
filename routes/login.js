/**
 * Login Page.
 * User: calvin
 * Date: 14/01/13
 * Time: 10:06 PM
 * To change this template use File | Settings | File Templates.
 */

exports.index = function (req, res) {
  res.render('login', {
    loggedIn: req.session.loggedIn,
    title: 'login',
    scrollspy: false
  });
};

exports.login = function (req, res) {
  var uname = req.body.username,
    pword = req.body.password,
    settings = require('../express_settings.js'),
    adminUsername = settings.Config.AdminUsername,
    adminPassword = settings.Config.AdminPassword;

  if (uname === adminUsername &&
    pword === adminPassword) {
    req.session.loggedIn = true;
    res.redirect('../admin');
    return;
  }
  console.trace(uname + ' did not match ' + adminUsername);
  console.trace(pword + ' did not match ' + adminPassword);
  res.redirect('../');
};

exports.logout = function (req, res) {
  req.session.loggedIn = false;
  res.redirect('/');
}