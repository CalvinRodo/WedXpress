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
          bought = regItems.select('purchased'),
          unbought = regItems.reject('purchased'),
          coming = inviteItems.where({ 'coming' : 'accept'}),
          invitesAccepted = coming.pluck('mainInvite')
                                  .select('name')
                                  .unique('name')
                                  .size();
      var foo = coming.map(function(rsvp){
          var i = 0,
              guest = [];
          while(rsvp['guest' + i] !== undefined){
            guest.push(rsvp['guest' + i]);
            i++;
          }
          return guest;
        }).flatten()
          .select('name');
        console.log(coming.value());

        console.log(foo.value());

      res.render('admin', {
        title : 'admin menu',
        loggedIn : true,
        totalBought : bought.pluck('price')
                            .reduce(sum, 0) / 100,
        rsvpTotal : regItems.pluck('price')
                            .reduce(sum, 0) / 100,
        unboughtCount : unbought.size(),
        boughtCount : bought.size(),
        totalComing : invitesAccepted,
        totalUnresponded : rsvpItems.reject('rsvpStatus')
                                    .size(),
        totalDeclined : inviteItems.where({ 'coming': 'decline'})
                                   .size(),
        totalGuests : foo.size() + invitesAccepted
    });
  });
};
