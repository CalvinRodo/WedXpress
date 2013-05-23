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
          invites = results[1];
    if (err) {
      console.error('Failed on rendering admin page');
      console.error(err);
    }

    res.render('rsvpadmin', {
      loggedIn: true,
      title: 'Invite Administration',
      scrollspy: false,
      inviteList: invites,
      rsvpList: rsvpList
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

exports.ViewRSVP = function ViewRSVP(req, res) {
  var async = require('async'),
    id = req.params.id;

  async.waterfall([function (callback) {
    var RsvpDB = require('../DataLayer/RsvpDB.js'),
      rsvpDB = new RsvpDB();
    rsvpDB.GetItemByID(id, function (err, result) {
      if (err) {
        console.error('failed on getting rsvp from db');
        console.error(err);
        res.redirect('/oops');
      }

      callback(null, result);
    });
  },
    function (rsvp, callback) {
      var InviteDB = require('../DataLayer/InviteDB.js'),
        inviteDB = new InviteDB();
      inviteDB.GetItemByID(rsvp.inviteId, function (err, result) {
        if (err) {
          console.error('failed on getting invite from db');
          console.error(err);
          res.redirect('/oops');
        }
        callback(null, rsvp, result);
      });
    }, function (rsvp, invite, callback) {
      res.render('includes/admin/rsvpModal', {
        loggedIn: true,
        coming: rsvp.coming,
        guests: getGuests(rsvp, invite.invites)
      });
    }
  ]);
};