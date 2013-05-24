function CreateRegistryItemFromRequest(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price * 100 //convert the amount into cents
  };
}

function CreateUpdateRegistryItemFromRequest(req) {
  return {
    $set: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price * 100 //convert the amount into cents
    }
  };
}

function CheckIfLoggedIn(req, res) {
  if (req.session.loggedIn !== true) {
    res.redirect('/');
  }
}

function DefaultRedirect(err, res) {
  if (err) {
    console.log('failed on error concerning ' + section);
    console.error(err);
    res.redirect('/oops');
    return;
  }
  res.redirect('/registryadmin');
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
  return new Buffer(JSON.stringify(s3Policy)).toString("base64");
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
    function getBoughtItems(callback) {
      registryDB.GetBoughtItems(callback);
    }
  ], function RenderPage(err, results) {
    var unboughtItems = results[0],
      boughtItems = results[1],
      md = require('markdown-js').markdown,
      _ = require('lodash'),
      count = _(unboughtItems).countBy('name').value();
    if (err) {
      console.error('Failed on rendering admin page');
      console.error(err);
    }

    res.render('registryadmin', {
      loggedIn: true,
      title: 'Registry Administration',
      scrollspy: false,
      items: _(unboughtItems).unique('name')
                             .each(function(item){ item.number = count[item.name]; })
                             .value(),
      boughtItems: boughtItems,
      md: md
    });
  });
};

//Registry Functions
exports.AddRegistryItem = function AddRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.SaveItem(CreateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });
};

exports.DeleteRegistryItem = function DeleteRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();

  db.DeleteItem(req.params.id, function (err, result) {
    DefaultRedirect(err, res);
  });
};

exports.EditRegistryItem = function EditRegistryItem(req, res) {
  CheckIfLoggedIn(req, res);

  var RegistryDB = require('../DataLayer/RegistryDB.js'),
    db = new RegistryDB();
  db.UpdateItem(req.params.id, CreateUpdateRegistryItemFromRequest(req), function (err, result) {
    DefaultRedirect(err, res);
  });

};

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
    });
  }, function (result, callback) {
    result._id = undefined;
    registryDB.SaveItem(result, function (err, result) {
      if (err) {
        console.error(err);
        res.redirect('/oops');
      }
      res.redirect('/registryAdmin');
    });
  }]);
};

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
};

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
};