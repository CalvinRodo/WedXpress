/*
 * GET home page.
 */
function createMenu(menuItems) {
  var menu = {};
  menuItems.forEach(function (item) {
    if (menu[item.course] === undefined) {

      menu[item.course] = {
        name: item.course,
        courses: []
      };

    }

    menu[item.course].courses
      .push(item.name);
  });
  return menu;
}


function getInvite(req, appender) {
  return {
    name: req.body['invite-name-' + appender],
    specialRequirements: req.body['requirement-' + appender],
    menu: {
      appetizer: req.body['appetizer-' + appender],
      entree: req.body['entree-' + appender],
      dessert: req.body['dessert-' + appender]
    }
  }
}
exports.index = function index(req, res) {
  res.render('index', {
    title: "Calvin and Amy's Wedding",
    scrollspy: true,
    rsvp: false
  });
};

exports.rsvp = function indexRsvp(req, res) {
  var async = require('async'),
    InviteDB = require('../DataLayer/InviteDB.js'),
    MenuDB = require('../DataLayer/MenuDB.js'),
    inviteDB = new InviteDB(),
    menuDB = new MenuDB(),
    url = req.params.inviteurl;

  if (url === undefined || url === null) {
    res.redirect('/');
    return;
  }

  async.parallel([
    function (callback) {
      inviteDB.getInviteByUrl(url, callback);
    },
    function (callback) {
      menuDB.GetItems(0, callback);
    }
  ], function (err, results) {
    var invite = results[0],
      menuItems = results[1];

    res.render('index', {
      title: "Calvin and Amy's Wedding",
      scrollspy: true,
      rsvp: true,
      invite: invite,
      menu: createMenu(menuItems)
    });
  });
};


exports.saveRsvp = function saveRsvp(req, res) {
  var id = req.params.id,
    async = require('async');

  async.auto({
    SaveSong: function (callback) {
      var SongDb = require('../DataLayer/SongDB.js'),
        songDb = new SongDb();
      songDb.SaveItem({
        userId: id,
        songName: req.body.song
      }, callback);
    },
    SaveRsvp: function (callback) {
      var RsvpDb = require('../DataLayer/RsvpDB.js'),
        rsvpDB = new RsvpDb(),
        invites = results.invites;
      inviteArr = new Array(invites),
        rsvp = {
          coming: req.body.rsvp,
          inviteId: id,
          mainInvite: getInvite(req, 'main')
        }
      inviteArr.forEach(function (i) {
        rsvp['guest' + i] = getInvite(req, i);
      });
      rsvpDB.SaveItem(rsvp, callback);
    },
    UpdateInvite: [ 'SaveSong', 'SaveRsvp', function (callback, results) {
      var InviteDb = require('../DataLayer/InviteDB.js'),
        inviteDb = new InviteDb();

      inviteDb.updateRsvpStatus(id, true, callback);
    }]
  }, function (err, results) {
    if (err) throw err;
    res.render('index', {

    })
  });

  res.redirect('/');
};
exports.SongList = function songList(req, res) {
  res.render('includes/index/songs',
    { songs: [
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'}
    ]
    });
};