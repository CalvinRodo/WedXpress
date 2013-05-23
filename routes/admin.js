function sum(result, value){
  return result + value;
}

exports.index = function AdminIndex(req, res){
  var async = require('async');

  async.parallel([
    function (callback) {
      var RegistryDB = require('../DataLayer/RegistryDB.js'),
          registryDB = new RegistryDB();
      registryDB.GetItems(0, callback);
    },
    function (callback) {
      var RsvpDB = require('../DataLayer/RsvpDB.js'),
          rsvpDB = new RsvpDB();
      rsvpDB.GetItems(0, callback);
    },
    function (callback) {
      var InviteDB = require('../DataLayer/InviteDB.js'),
          inviteDB = new InviteDB();
      inviteDB.GetItems(0, callback);
    }],
    function (err, results) {
      if (err){
        throw err;
      }

      var _ = require('lodash'),
          regItems = _(results[0]),
          rsvpItems = _(results[2]),
        inviteItems = _(results[1]),
          total = regItems.pluck('price').reduce(sum, 0) / 100,
          bought = regItems.select('purchased'),
          unbought = regItems.reject('purchased'),
          totalBought = bought.pluck('price').reduce(sum, 0) / 100;

      res.render('admin', {
        title : 'Admin Menu',
        loggedIn : true,
        totalBought: totalBought,
        rsvpTotal: total,
        unboughtCount: unbought.size(),
        boughtCount: bought.size(),
        totalComing: inviteItems.where({ 'coming' : 'accept'}).size(),
        totalUnresponded: rsvpItems.reject('rsvpStatus').size(),
        totalDeclined: inviteItems.where({ 'coming': 'decline'}).size()
      });
  });
}
