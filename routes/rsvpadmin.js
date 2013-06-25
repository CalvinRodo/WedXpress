function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn !== true) {
    res.redirect('/');
  }
}

function DefaultRedirect(err, res, section) {
  if (err) {
    console.log('failed on error concerning ' + section);
    console.error(err);
    res.redirect('/oops');
    return;
  }
res.redirect('/admin' + section);
}

function SendResultAsJson(err, result, res) {
  if (err) {
    console.error(err);
    res.send(500, result);
  }
  res.send(200, result);

}

function getGuests(rsvp) {
  var guests = [],
    guest;
  guests.push(rsvp.mainInvite);
  for (var i = 0; i < 10; i++) {
    guest = rsvp["guest" + i];
    //TODO: find a better way to handle this
    if (guest !== undefined &&
      guest.name !== '' &&
      guest.name !== undefined &&
      guest.name !== null) {
      guests.push(guest);
    }
  }
  return guests;
}

function getGuests(rsvp, numInvites) {
  var guests = [],
    guest;
  guests.push(rsvp.mainInvite);
  for (var i = 0; i < numInvites; i++) {
    guest = rsvp["guest" + i];
    //TODO: find a better way to handle this
    if (guest !== undefined &&
      guest.name !== '' &&
      guest.name !== undefined &&
      guest.name !== null) {
      guests.push(guest);
    }
  }
  return guests;
}

function CreateUpdateInviteFromRequest(req) {
  return {
    $set: {
      name: req.body.name,
      invites: req.body.guests,
      url: req.body.url.toLowerCase()
    }
  };
}

function CreateInviteFromRequest(req) {
  return {
    name: req.body.name,
    invites: req.body.guests,
    url: req.body.url.toLowerCase()
  };
}

exports.index = function index(req, res) {
  CheckIfLoggedIn(req, res);
  var async = require('async');

  async.parallel([
    function getRsvpItems(callback) {
      var RsvpDB = require('../DataLayer/RsvpDB.js'),
        rsvpDB = new RsvpDB();

      rsvpDB.GetItems(0, callback);
    },
    function getInvites(callback){
      var InviteDB = require('../DataLayer/InviteDB.js'),
          inviteDB = new InviteDB();
      inviteDB.GetItems(0, callback);

    }
  ], function RenderPage(err, results) {
      var rsvpList = results[0],
          invites = results[1],
          _ = require('lodash');

    if (err) {
      console.error('Failed on rendering admin page');
      console.error(err);
    }


    res.render('rsvpadmin', {
      loggedIn: true,
      title: 'Invite Administration',
      scrollspy: false,
      inviteList: _(invites).reject(function (item) {
        return _(rsvpList).some(function(rsvp) {
          return rsvp.inviteId === item._id.toString();
        });
      }).value(),
<<<<<<< HEAD
      rsvpList: _(rsvpList).reject({'coming': 'decline'}).value(),
      declineList : _(rsvpList).select({'coming': 'decline'}).value()
=======
      rsvpList: _(rsvpList).map(function(item) { 
        item['guests'] = getGuests(item);
        return item;  
      }).value()
>>>>>>> 1f58fe4111288a4a7450996ee6c0ca44f3f276da
    });
  });
};


exports.AddInvite = function AddInvite(req, res) {
  CheckIfLoggedIn(req, res);
  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.SaveItem(CreateInviteFromRequest(req), function (err, results) {
    DefaultRedirect(err, res, '#GuestAdmin');
  });
};

exports.DeleteInvite = function DeleteInvite(req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res, '#GuestAdmin');
  });
};

exports.EditInvite = function EditInvite(req, res) {

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();
  db.UpdateItem(req.params.id, CreateUpdateInviteFromRequest(req), function (err, result) {
    DefaultRedirect(err, res, '#GuestAdmin');
  });
};

exports.GetInvite = function GetInvite(req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.GetItemByID(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
  });
};
