function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/index');
  }
}

function CreateRegistryItemFromRequest(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
}

function CreateInviteFromRequest(req) {
  return {
    name: req.body.name,
    invites: req.body.guests,
    url: req.body.url
  };
}

function DefaultRedirect(err, res) {
  if (err) throw err;
  res.redirect('/admin');
}

function SendResultAsJson(err, result, res) {
  if (err) throw err;
  res.send(200, result);

}

exports.index = function (req, res) {
  CheckIfLoggedIn(req, res);
  var async = require('async');

  async.parallel([
    function getRegistryItems(callback) {
      var RegistryDB = require('../DataLayer/RegistryDB.js'),
        registryDB = new RegistryDB();

      registryDB.GetItems(0, callback);
    },
    function getUnusedInvites(callback) {
      var InviteDB = require('../DataLayer/InviteDB.js'),
        inviteDB = new InviteDB();

      inviteDB.getAllUnusedRSVPs(callback);
    },
    function getMenuItems(callback) {
      var MenuDB = require('../DataLayer/MenuDB.js'),
        menuDB = new MenuDB();

      menuDB.GetItems(0, callback);
    },
    function getRsvpItems(callback) {
      var RsvpDB = require('../DataLayer/RsvpDB.js'),
        rsvpDB = new RsvpDB();

      rsvpDB.GetItems(0, callback);
    }
  ], function (err, results) {
    var registryItems = results[0],
      invites = results[1],
      menus = results[2],
      rsvpList = results[3];

    if (err) throw(err);

    res.render('admin', {
      title: 'Registry Administration',
      scrollspy: false,
      inviteList: invites,
      items: registryItems,
      menuItems: menus,
      rsvpList: rsvpList
    });
  });
};

exports.AddInvite = function (req, res) {
  CheckIfLoggedIn(req, res);
  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.SaveItem(CreateInviteFromRequest(req), function (err, results) {
    DefaultRedirect(err, res)
  });
};

exports.DeleteInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
}

exports.EditInvite = function (req, res) {

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();
  db.UpdateItem(req.params.id, CreateInviteFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });
}

exports.GetInvite = function (req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.GetItemByID(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
  });
}

//Registry Functions
exports.AddRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.SaveItem(CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });
};

exports.DeleteRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
}

exports.EditRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();
  db.UpdateItem(req.params.id, CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });

}

exports.GetRegistryItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetItemByID(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
  });

};

//Menu Functions
exports.AddMenuItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.SaveItem({
    name: req.body.name,
    course: req.body.course
  }, function (err, result) {
    DefaultRedirect(err, res);
  })
};

exports.DeleteMenuItem = function (req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
};


function getGuests(rsvp, numInvites) {
  var guests = [],
    guest;
  guests.push(rsvp.mainInvite);
  for (var i, i = 0; i < numInvites; i++) {
    guest = rsvp["guest" + i];
    if (guest !== undefined) {
      guests.push(guest);
    }
  }
  return guests;
}
exports.ViewRSVP = function ViewRSVP(req, res) {
  var async = require('async'),
    id = req.params.id;

  async.waterfall([function (callback) {
    var RsvpDB = require('../DataLayer/RsvpDB.js'),
      rsvpDB = new RsvpDB();
    rsvpDB.GetItemByID(id, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  },
    function (rsvp, callback) {
      var InviteDB = require('../DataLayer/InviteDB.js'),
        inviteDB = new InviteDB();
      inviteDB.GetItemByID(rsvp.inviteId, function (err, result) {
        if (err) throw err;
        callback(null, rsvp, result);
      });
    }, function (rsvp, invite, callback) {
      res.render('includes/admin/rsvpModal', {
        coming: rsvp.coming,
        guests: getGuests(rsvp, invite.invites)
      });
    }
  ]);
}
exports.Upload = function (req, res) {
  var settings = require('../express_settings'),
    crypto = require('crypto'),
    mime = require('mime-magic'),
    id = req.param.id;


  CheckIfLoggedIn(req, res);
  res.render('uploadModal', {
    AWSAccessKeyID: settings.Config.AWSAccessKeyID
//    policy : Creates3Policy()
  });
};


//var CreateS3Credentials = function CreateS3Credentials( mimetype, callback ) {
//  var s3PolicyBase64, _date, _s3Policy;
//  _date = new Date();
//  return {
//    "expiration": "" + (_date.getFullYear()) + "-" + (_date.getMonth() + 1) + "-" + (_date.getDate()) + "T" + (_date.getHours() + 1) + ":" + (_date.getMinutes()) + ":" + (_date.getSeconds()) + "Z",
//    "conditions": [
//      { "bucket": "WedXPress" },
//      ["starts-with", "$Content-Disposition", ""],
//      ["starts-with", "$key", "someFilePrefix_"],
//      { "acl": "public-read" },
//      { "success_action_redirect": "localhost" },
//      ["content-length-range", 0, 2147483648],
//      ["eq", "$Content-Type", mimetype]
//    ]
//  }
//}
//
//var CreateS3Policy = function CreateS3Policy () {
//    return {
//      s3PolicyBase64: new Buffer( JSON.stringify( s3Policy ) ).toString( 'base64' ),
//      s3Signature: crypto.createHmac( "sha1", "yourAWSsecretkey" ).update( s3Policy ).digest( "base64" ),
//      s3Key: "Your AWS Key",
//      s3Redirect: "http://example.com/uploadsuccess",
//      s3Policy: s3Policy
//    }
//}
