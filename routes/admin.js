function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn != true) {
    res.redirect('/');
  }
}

function CreateRegistryItemFromRequest(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price * 100 //convert the amount into cents
  };
}

function CreateInviteFromRequest(req) {
  return {
    name: req.body.name,
    invites: req.body.guests,
    url: req.body.url
  };
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

function getGuests(rsvp, numInvites) {
  var guests = [],
    guest;
  guests.push(rsvp.mainInvite);
  for (var i, i = 0; i < numInvites; i++) {
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

function SendResultAsJson(err, result, res) {
  if (err) {
    console.error(err);
    res.send(500, result);
  }
  res.send(200, result);

}

function createPolicy() {
  var settings = require('../express_settings.js'),
    moment = require('moment'),
    s3Policy = {
      expiration: moment.utc().add('minutes', 30).format('YYYY-MM-DDTHH:mm:ss\\Z'),
      conditions: [
        { bucket: settings.Config.Bucket },
        { acl: 'public-read-write' },
        { success_action_status: '201' },
        ['starts-with', '$key', ''],
        ['starts-with', '$Content-Type', 'image/']
      ]
    };
  return new Buffer(JSON.stringify(s3Policy)).toString("base64")
}

exports.index = function index(req, res) {
  CheckIfLoggedIn(req, res);
  var async = require('async'),
    RegistryDB = require('../DataLayer/RegistryDB.js'),
    registryDB = new RegistryDB();

  async.parallel([
    function getUnboughtRegistryItems(callback) {
      registryDB.GetUnboughtItems(callback);
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
    },
    function getBoughtItems(callback) {
      registryDB.GetBoughtItems(callback);
    }
  ], function RenderPage(err, results) {
    var unboughtItems = results[0],
      invites = results[1],
      menus = results[2],
      rsvpList = results[3],
      boughtItems = results[4],
      md = require('markdown-js').markdown;

    if (err) {
      console.error('Failed on rendering admin page');
      console.error(err);
    }


    res.render('admin', {
      loggedIn: true,
      title: 'Registry Administration',
      scrollspy: false,
      inviteList: invites,
      items: unboughtItems,
      boughtItems: boughtItems,
      menuItems: menus,
      rsvpList: rsvpList,
      md: md
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
}

exports.EditInvite = function EditInvite(req, res) {

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();
  db.UpdateItem(req.params.id, CreateInviteFromRequest(req), function (err, result) {
    DefaultRedirect(err, res, '#GuestAdmin');
  });
}

exports.GetInvite = function GetInvite(req, res) {
  CheckIfLoggedIn(req, res);

  var InviteDB = require('../DataLayer/InviteDB.js'),
    db = new InviteDB();

  db.GetItemByID(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
  });
}

//Registry Functions
exports.AddRegistryItem = function AddRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.SaveItem(CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res, '#RegistryAdmin');
  });
};

exports.DeleteRegistryItem = function DeleteRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res, "#RegistryAdmin");
  });
}

exports.EditRegistryItem = function EditRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();
  db.UpdateItem(req.params.id, CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res, "#RegistryAdmin");
  });

}

exports.GetRegistryItem = function GetRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.GetItemByID(req.params.id, function (err, result) {
    SendResultAsJson(err, result, res);
  });

};

exports.CopyRegistryItem = function CopyRegistryItem(req, res) {
  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    registryDB = new RegistryDB(),
    async = require('async'),
    id = req.params.id;

  async.waterfall([ function GetRegistryItem(callback) {
    registryDB.GetItemByID(id, function (err, result) {
      if (err) {
        console.error(err);
        res.redirect('/oops');
      }

      callback(null, result);
    })
  }, function (result, callback) {
    result._id = undefined;
    registryDB.SaveItem(result, function (err, result) {
      if (err) {
        console.error(err);
        res.redirect('/oops');
      }
      res.redirect('/admin#RegistryAdmin');
    });
  }]);


}
//Menu Functions
exports.AddMenuItem = function AddMenuItem(req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.SaveItem({
    name: req.body.name,
    course: req.body.course
  }, function (err, result) {
    DefaultRedirect(err, res, '#MenuAdmin');
  })
};

exports.DeleteMenuItem = function DeleteMenuItem(req, res) {
  CheckIfLoggedIn(req, res);

  var MenuDB = require('../DataLayer/MenuDB.js'),
    db = new MenuDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res, "#MenuAdmin");
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
}

//Upload functions
exports.Upload = function Upload(req, res) {
  var settings = require('../express_settings.js'),
    crypto = require('crypto'),
    policy = createPolicy(),
    signature = crypto.createHmac('sha1', settings.Config.AWSAccessKeySecret).update(policy).digest('base64');
  res.json({
    "AWSAccessKeyId": settings.Config.AWSAccessKeyID,
    "acl": "public-read-write",
    "policy": policy,
    "signature": signature,
    "success_action_status": "201"
  });
};

exports.SaveUploadInfo = function SaveUploadInfo(req, res) {
  var id = req.body.id,
    filename = req.body.filename,
    location = req.body.location,
    bucket = req.body.bucket,
    key = req.body.key,
    async = require('async');

  async.parallel([
    function updateItem(callback) {
      var RegistryDB = require('../DataLayer/RegistryDB.js'),
        registryDB = new RegistryDB(),
        upload = {
          'filename': filename,
          'location': location,
          'bucket': bucket,
          'key': key
        };
      registryDB.UpdateByID(id, {'image': upload }, callback);
    },
    function saveItemLocation(callback) {
      var FileDB = require('../DataLayer/ImageDB.js'),
        fileDB = new FileDB();
      fileDB.SaveItem(location, callback);
    }
  ], function (err, results) {
    if (err) {
      console.error(err);
      res.send(500);
    }
    res.send(200);
  });
}

exports.GetImageList = function GetImageList(req, res) {
  var ImageDB = require('../DataLayer/ImageDB.js'),
    imageDB = new ImageDB();
  imageDB.GetItems(0, function (err, result) {
    if (err) {
      console.log(error);
      res.redirect('/oops');
    }
    var id = req.params.id;
    res.render('FileSelectorModal', {
      'id': id,
      images: result
    });
  });
}
